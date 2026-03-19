<template>
  <TitleSection title="Quà cưới" />
  <div class="accounts-grid">
    <div v-if="accounts.length === 0" class="gift-card">
      <div class="text-sm text-gray-500">Chưa có thông tin tài khoản.</div>
    </div>

    <div class="accounts-row" v-else>
      <div class="gift-card" v-for="acc in accounts" :key="acc._id">
        <div class="qr-row">
          <div class="qr-item" v-if="acc.qrData">
            <img :src="acc.qrData" alt="VietQR" />
          </div>
          <div class="qr-item qr-placeholder" v-else>
            <span>QR không khả dụng</span>
          </div>
        </div>

        <div class="account-info">
          <div class="info-row">
            <strong>Ngân hàng:</strong>
            <span>{{ acc.bankName || "---" }}</span>
          </div>
          <div class="info-row">
            <strong>Số tài khoản:</strong>
            <span>{{ acc.accountNumber || "---" }}</span>
          </div>
          <div class="info-row">
            <strong>Tên tài khoản:</strong>
            <span>{{ acc.accountHolder || "---" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import QRCode from "qrcode";
import api from "../api/axios";
import TitleSection from "./common/TitleSection.vue";

// ── Bank BIN map (VietQR / NAPAS) ────────────────────────────────────────────
const BANK_BIN_MAP = {
  // State-owned / big 4
  VIETCOMBANK: "970436",
  VCB: "970436",
  VIETINBANK: "970415",
  CTG: "970415",
  BIDV: "970418",
  AGRIBANK: "970405",
  VBSP: "970405",
  // Joint-stock
  TECHCOMBANK: "970407",
  TCB: "970407",
  MBBANK: "970422",
  MB: "970422",
  VPBANK: "970432",
  VPB: "970432",
  TPBANK: "970423",
  TPB: "970423",
  ACB: "970416",
  SACOMBANK: "970403",
  STB: "970403",
  HDBANK: "970437",
  HDB: "970437",
  OCBBANK: "970448",
  OCB: "970448",
  MSBANK: "970426",
  MSB: "970426",
  SEABANK: "970440",
  LIENVIETPOSTBANK: "970449",
  LPB: "970449",
  VIETBANK: "970433",
  VIB: "970441",
  NCB: "970419",
  ABBANK: "970425",
  PGBANK: "970430",
  NAMABANK: "970428",
  DONGABANK: "970406",
  DAB: "970406",
  SCBBANK: "970429",
  SCB: "970429",
  PVCOMBANK: "970412",
  GPBANK: "970408",
  BAOVIETBANK: "970438",
  KIENLONGBANK: "970452",
  COOPBANK: "970446",
  VIETCAPITALBANK: "970454",
  BVB: "970454",
  BACABANK: "970409",
  // Foreign
  SHINHANBANK: "970424",
  WOORIBANK: "970457",
  PUBLICBANK: "970439",
  INDOVINABANK: "970434",
  UOBBANK: "970458",
  CITIBANK: "533948",
  STANDARDCHARTERED: "970410",
  HSBC: "458761",
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const normalizeBankKey = (name) =>
  (name || "").toUpperCase().replace(/[\s\-_.]+/g, "");

const getBankBin = (bankName) =>
  BANK_BIN_MAP[normalizeBankKey(bankName)] ?? null;

const removeAccents = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

// EMVCo TLV helper
const tlv = (id, value) =>
  `${id}${String(value.length).padStart(2, "0")}${value}`;

// CRC-16-CCITT (poly 0x1021, init 0xFFFF)
const crc16 = (str) => {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++)
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
};

/**
 * Build a NAPAS/VietQR static EMVCo QR string.
 * Point of Initiation = 11 (static), no amount.
 */
const buildVietQR = ({ bankBin, accountNumber, accountName }) => {
  const name = removeAccents(accountName || "UNKNOWN").substring(0, 25);

  // 🔥 Consumer Account Info (nested)
  const consumerAccount = tlv("00", bankBin) + tlv("01", accountNumber);

  // 🔥 Merchant Account Info (NAPAS đúng chuẩn)
  const merchantAccountInfo =
    tlv("00", "A000000727") + // AID
    tlv("01", consumerAccount) + // nested account info
    tlv("02", "QRIBFTTA"); // transfer method

  const field38 = tlv("38", merchantAccountInfo);

  let payload =
    tlv("00", "01") + // Payload Format
    tlv("01", "11") + // Static QR
    field38 +
    tlv("52", "0000") +
    tlv("53", "704") +
    tlv("58", "VN") +
    tlv("59", name) +
    tlv("60", "HO CHI MINH") +
    "6304";

  return payload + crc16(payload);
};

// ── State ─────────────────────────────────────────────────────────────────────
const accounts = ref([]);

const generateQRsFor = async (list) =>
  Promise.all(
    list.map(async (acc) => {
      const out = { ...acc };
      const bankBin = getBankBin(acc.bankName);
      if (bankBin && acc.accountNumber) {
        try {
          const qrString = buildVietQR({
            bankBin,
            accountNumber: acc.accountNumber,
            accountName: acc.accountHolder || acc.accountNumber,
          });
          // Force BYTE mode — EMVCo/VietQR requires byte encoding;
          // qrcode library auto-picks ALPHANUMERIC for uppercase strings
          // which bank apps reject.
          out.qrData = await QRCode.toDataURL(
            [{ data: qrString, mode: "byte" }],
            { errorCorrectionLevel: "M", margin: 1, width: 220 },
          );
        } catch (e) {
          console.warn("QR generation failed", e);
          out.qrData = null;
        }
      } else {
        out.qrData = null;
        if (!bankBin) console.warn(`Bank BIN not found for: "${acc.bankName}"`);
      }
      return out;
    }),
  );

const loadAccount = async () => {
  try {
    const res = await api.get("/accounts");
    if (res.data && Array.isArray(res.data.data)) {
      accounts.value = await generateQRsFor(res.data.data);
    }
  } catch (err) {
    console.warn("Failed to load account info", err?.message || err);
  }
};

onMounted(loadAccount);
</script>
<style scoped>
.gift-card {
  border-radius: 12px;
  padding: 18px;
  background: #fff;
  text-align: center;
  max-width: 420px;
  margin: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04);
}
.qr-row {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 14px;
}
.accounts-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 100%;
}
.qr-item img {
  width: 220px;
  height: 220px;
  object-fit: contain;
  border-radius: 6px;
}
.qr-placeholder {
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ddd;
  border-radius: 6px;
  font-size: 12px;
  color: #aaa;
}
.account-info {
  color: #444;
  text-align: left;
  padding: 0 18px;
}
.info-row {
  padding: 6px 0;
  border-bottom: 1px solid #f2f2f2;
}
.info-row strong {
  display: inline-block;
  width: 120px;
}
</style>
