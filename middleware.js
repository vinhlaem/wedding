const SITE_URL = "https://wedding-vinh-nguyet.vercel.app";
const OG_IMAGE = `${SITE_URL}/og.jpg`;

const COUPLE = {
  groomName: "Trương Đình Vinh",
  brideName: "Võ Thị Minh Nguyệt",
  displayDate: "30 tháng 5, 2027",
};

const BOT_UA_PATTERN =
  /facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp|zalo|zaloapp|skypeuripreview|pinterest|googlebot|bingbot/i;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const normalizeGuest = (value) => {
  if (!value) return "Quý khách";

  try {
    return decodeURIComponent(value).trim() || "Quý khách";
  } catch {
    return String(value).trim() || "Quý khách";
  }
};

const normalizePlace = (value) => (value === "bride" ? "bride" : "groom");

const buildInviteMetaHtml = ({ url, guestName, place }) => {
  const side = place === "bride" ? "nhà gái" : "nhà trai";
  const title = `Thân mời ${guestName} dự lễ cưới ${COUPLE.groomName} & ${COUPLE.brideName}`;
  const description = `Thiệp cưới ${COUPLE.groomName} & ${COUPLE.brideName} trân trọng mời ${guestName} đến chung vui vào ${COUPLE.displayDate}. Thông tin nghi lễ và tiệc cưới bên ${side}.`;

  const safeUrl = escapeHtml(url.toString());
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeGuestName = escapeHtml(guestName);

  console.log(safeTitle);

  return `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#b94a58">
    <link rel="canonical" href="${safeUrl}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Đám cưới Vinh & Nguyệt">
    <meta property="og:locale" content="vi_VN">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:url" content="${safeUrl}">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:image:secure_url" content="${OG_IMAGE}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Thiệp cưới Vinh & Nguyệt">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDescription}">
    <meta name="twitter:image" content="${OG_IMAGE}">
    <meta name="twitter:image:alt" content="Thiệp cưới Vinh & Nguyệt">

    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Đám cưới ${COUPLE.groomName} & ${COUPLE.brideName}`,
      alternateName: `Thiệp cưới gửi ${guestName}`,
      startDate: "2027-05-30T17:30:00+07:00",
      endDate: "2027-05-30T21:00:00+07:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: [OG_IMAGE],
      description,
      url: url.toString(),
      attendee: {
        "@type": "Person",
        name: guestName,
      },
      organizer: {
        "@type": "Person",
        name: `${COUPLE.groomName} & ${COUPLE.brideName}`,
      },
    })}
    </script>
  </head>
  <body>
    <main style="font-family: Arial, sans-serif; padding: 24px; color: #b94a58;">
      <h1>${safeTitle}</h1>
      <p>${safeDescription}</p>
      <p><a href="${safeUrl}">Mở thiệp cưới của ${safeGuestName}</a></p>
    </main>
  </body>
</html>`;
};

export const config = {
  matcher: ["/invite"],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent") || "";

  if (url.pathname !== "/invite" || !BOT_UA_PATTERN.test(userAgent)) {
    return;
  }

  const guestName = normalizeGuest(url.searchParams.get("guest"));
  const place = normalizePlace(url.searchParams.get("place"));
  const html = buildInviteMetaHtml({ url, guestName, place });

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
