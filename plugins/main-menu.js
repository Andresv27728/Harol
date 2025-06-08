let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid?.[0] || m.sender;
  let user = global.db.data.users[userId];
  let name = conn.getName(userId);
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let totalreg = Object.keys(global.db.data.users).length;

  let hour = new Intl.DateTimeFormat('es-PE', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'America/Lima'
  }).format(new Date());

  let saludo = hour < 6 ? "🌌 Buenas madrugadas, espíritu insomne..." :
               hour < 12 ? "🌅 Buenos días, alma luminosa~" :
               hour < 18 ? "🌄 Buenas tardes, viajero astral~" :
               "🌃 Buenas noches, sombra errante~";

  let categories = {};
  for (let plugin of Object.values(global.plugins)) {
    if (!plugin.help || !plugin.tags) continue;
    for (let tag of plugin.tags) {
      if (!categories[tag]) categories[tag] = [];
      categories[tag].push(...plugin.help.map(cmd => `#${cmd}`));
    }
  }

  let decoEmojis = ['✨', '🌸', '👻', '⭐', '🔮', '💫', '☁️', '🦋', '🪄'];
  let emojiRandom = () => decoEmojis[Math.floor(Math.random() * decoEmojis.length)];

  let menuText = `
╭───❖ 𝓗𝓪𝓷𝓪𝓴𝓸 𝓑𝓸𝓽 ❖───╮

｡ﾟ☆: *.${name}.* :☆ﾟ｡          
> *_${saludo}_*

╰─────❖ 𝓜𝓮𝓷𝓾 ❖─────╯

✦ 𝙸𝙽𝙵𝙾 𝙳𝙴 𝚂𝚄𝙼𝙾𝙽 ✦

💻 Sistema: Multi-Device
👤 Espíritu: @${userId.split('@')[0]}
⏰ Tiempo activo: ${uptime}
👥 Espíritus: ${totalreg} Espíritus
⌚ Hora: ${hour}

> Hecho con amor por: *_SoyMaycol_* (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤

≪──── ⋆𓆩✧𓆪⋆ ────≫
`.trim();

  for (let [tag, cmds] of Object.entries(categories)) {
    let tagName = tag.toUpperCase().replace(/_/g, ' ');
    let deco = emojiRandom();
    menuText += `

╭─━━━ ${deco} ${tagName} ${deco} ━━━╮
${cmds.map(cmd => `│ ➯ ${cmd}`).join('\n')}
╰─━━━━━━━━━━━━━━━━╯`;
  }

  await conn.reply(m.chat, '⌜ ⊹ Espera tantito, espíritu curioso... ⊹ ⌟', m, {
    contextInfo: {
      externalAdReply: {
        title: botname,
        body: "Un amor que nunca se acaba Jeje <3",
        thumbnailUrl: 'https://files.catbox.moe/x9hw62.png',
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      }
    }
  });

  await conn.sendMessage(m.chat, {
  video: { url: 'https://files.catbox.moe/i74z9e.mp4', gifPlayback: true },
  caption: menuText,
  gifPlayback: true,
  footer: '✨ Hanako Bot by SoyMaycol ✨',
  templateButtons: [
    { index: 1, urlButton: { displayText: '📰 Entrar al Canal', url: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R' } },
    { index: 2, quickReplyButton: { displayText: '👑 Ver Staff', id: '.staff' } }
  ],
  contextInfo: {
    mentionedJid: [m.sender, userId],
    forwardingScore: 999,
    isForwarded: true,
    externalAdReply: {
      title: botname,
      body: "Un amor que nunca se acaba Jeje <3",
      thumbnailUrl: banner,
      sourceUrl: redes,
      mediaType: 1,
      showAdAttribution: true,
      renderLargerThumbnail: true,
    },
  }
}, { quoted: m });

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];
handler.register = true;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return `${h}h ${m}m ${s}s`;
}
