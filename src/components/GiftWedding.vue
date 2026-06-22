<template>
  <section id="gift" class="gift-section reveal" :class="`gift-section--${variant}`">
    <template v-if="variant !== 'invite'">
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

    <template v-else>
      <h2 class="gift-invite__title">PHONG BAO MỪNG CƯỚI</h2>
      <button class="gift-envelope" type="button" @click="openGiftModal">
        <span class="gift-envelope__coin gift-envelope__coin--one">●</span>
        <span class="gift-envelope__coin gift-envelope__coin--two">●</span>
        <span class="gift-envelope__body">囍</span>
        <span class="gift-envelope__hint">Nhấn để mở</span>
      </button>
    </template>

    <div v-if="showModal" class="gift-modal" @click.self="closeGiftModal">
      <article class="gift-modal__dialog" role="dialog" aria-modal="true" aria-label="Phong bao mừng cưới">
        <button class="gift-modal__close" type="button" @click="closeGiftModal">×</button>
        <h2>PHONG BAO MỪNG CƯỚI</h2>

        <div v-if="modalAccounts.length" class="gift-modal__grid">
          <div class="gift-modal__account" v-for="acc in modalAccounts" :key="acc._id || acc.accountNumber">
            <p class="gift-modal__role">{{ acc.role || acc.accountHolder || "Tài khoản" }}</p>
            <div class="gift-modal__qr" v-if="acc.qrData">
              <img :src="acc.qrData" alt="VietQR" />
            </div>
            <div class="gift-modal__qr gift-modal__qr--empty" v-else>QR không khả dụng</div>
            <p>{{ acc.bankName || "---" }}</p>
            <p>{{ acc.accountNumber || "---" }}</p>
            <strong>{{ acc.accountHolder || "---" }}</strong>
            <button v-if="acc.qrData" class="gift-modal__save" type="button" @click="downloadQR(acc)">
              Lưu QR
            </button>
          </div>
        </div>

        <p v-else class="gift-modal__empty">Chưa có thông tin tài khoản.</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import QRCode from "qrcode";
import api from "../api/axios";
import TitleSection from "./common/TitleSection.vue";

const props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
});

// ── Bank BIN map (VietQR / NAPAS) ────────────────────────────────────────────
const BANK_BIN_MAP = {
  VIETCOMBANK: "970436",
  VCB: "970436",
  VIETINBANK: "970415",
  CTG: "970415",
  BIDV: "970418",
  AGRIBANK: "970405",
  VBSP: "970405",
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
  SHINHANBANK: "970424",
  WOORIBANK: "970457",
  PUBLICBANK: "970439",
  INDOVINABANK: "970434",
  UOBBANK: "970458",
  CITIBANK: "533948",
  STANDARDCHARTERED: "970410",
  HSBC: "458761",
};

const normalizeBankKey = (name) =>
  (name || "").toUpperCase().replace(/[\s\-_.]+/g, "");

const getBankBin = (bankName) =>
  BANK_BIN_MAP[normalizeBankKey(bankName)] ?? null;

const removeAccents = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

const tlv = (id, value) =>
  `${id}${String(value.length).padStart(2, "0")}${value}`;

const crc16 = (str) => {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++)
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
};

const buildVietQR = ({ bankBin, accountNumber, accountName }) => {
  const name = removeAccents(accountName || "UNKNOWN").substring(0, 25);
  const consumerAccount = tlv("00", bankBin) + tlv("01", accountNumber);
  const merchantAccountInfo =
    tlv("00", "A000000727") + tlv("01", consumerAccount) + tlv("02", "QRIBFTTA");
  const field38 = tlv("38", merchantAccountInfo);

  let payload =
    tlv("00", "01") +
    tlv("01", "11") +
    field38 +
    tlv("52", "0000") +
    tlv("53", "704") +
    tlv("58", "VN") +
    tlv("59", name) +
    tlv("60", "HO CHI MINH") +
    "6304";

  return payload + crc16(payload);
};

const accounts = ref([]);
const showModal = ref(false);
const modalAccounts = computed(() => accounts.value.slice(0, 2));

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

function openGiftModal() {
  showModal.value = true;
  document.body.style.overflow = "hidden";
}

function closeGiftModal() {
  showModal.value = false;
  document.body.style.overflow = "";
}

function downloadQR(acc) {
  if (!acc.qrData) return;
  const link = document.createElement("a");
  link.href = acc.qrData;
  link.download = `${acc.accountHolder || "wedding-qr"}.png`;
  link.click();
}

onMounted(loadAccount);
</script>

<style scoped>
.gift-section {
  background: #fff;
  padding: 80px 20px;
}
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

.gift-section--invite {
  padding: clamp(56px, 8vw, 112px) clamp(20px, 5vw, 72px) 52px;
  background: transparent;
  text-align: center;
  color: #b94a58;
}

.gift-invite__title,
.gift-modal__dialog h2 {
  margin: 0 0 28px;
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 500;
  letter-spacing: 0.1em;
}

.gift-envelope {
  position: relative;
  display: inline-grid;
  justify-items: center;
  gap: 18px;
  border: 0;
  background: transparent;
  color: #b94a58;
  cursor: pointer;
}

.gift-envelope__body {
  width: 146px;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #ffb12a;
  border-radius: 8px;
  background: #d71920;
  color: #ffcf57;
  font-size: 58px;
  box-shadow: 0 20px 36px rgba(118, 45, 45, 0.22);
}

.gift-envelope__hint {
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
}

.gift-envelope__coin {
  position: absolute;
  color: #ffc341;
  font-size: 30px;
  text-shadow: 0 2px 0 #e89912;
}

.gift-envelope__coin--one {
  top: 16px;
  left: -18px;
}

.gift-envelope__coin--two {
  top: 82px;
  right: -28px;
}

.gift-modal {
  position: fixed;
  inset: 0;
  z-index: 2200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.42);
}

.gift-modal__dialog {
  position: relative;
  width: min(760px, 100%);
  max-height: min(86vh, 720px);
  overflow-y: auto;
  border-radius: 14px;
  background: #fff3f4;
  color: #b94a58;
  padding: clamp(28px, 5vw, 46px);
  box-shadow: 0 30px 80px rgba(60, 20, 26, 0.32);
}

.gift-modal__close {
  position: absolute;
  top: 18px;
  right: 18px;
  border: 0;
  background: transparent;
  color: #b94a58;
  font-size: 32px;
  cursor: pointer;
}

.gift-modal__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(24px, 6vw, 64px);
}

.gift-modal__account {
  text-align: center;
  font-family: var(--font-mulish);
}

.gift-modal__role {
  min-height: 44px;
  font-weight: 700;
}

.gift-modal__qr {
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px auto;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 22px rgba(99, 54, 54, 0.15);
}

.gift-modal__qr img {
  width: 160px;
  height: 160px;
  object-fit: contain;
}

.gift-modal__qr--empty {
  color: #9b6970;
  font-size: 0.85rem;
}

.gift-modal__account p,
.gift-modal__account strong {
  display: block;
  margin: 5px 0;
}

.gift-modal__save {
  margin-top: 12px;
  border: 0;
  border-radius: 999px;
  padding: 8px 16px;
  background: rgba(185, 74, 88, 0.12);
  color: #b94a58;
  cursor: pointer;
}

.gift-modal__empty {
  margin: 0;
}

@media (max-width: 768px) {
  .gift-section {
    padding: 60px 16px;
  }

  .gift-section--invite {
    padding: 56px 18px 48px;
  }

  .gift-modal__grid {
    grid-template-columns: 1fr;
  }
}
</style>