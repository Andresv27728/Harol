const handler = async (m, { args, text, conn, command }) => {
  if (!text.includes('|')) {
    return conn.reply(m.chat, `Formato incorrecto ✋\n\nUsa así:\n/recordatorio 60s | Tu mensaje`, m);
  }

  let [tiempoStr, mensaje] = text.split('|').map(v => v.trim());
  let ms = 0;

  if (tiempoStr.endsWith('s')) ms = parseInt(tiempoStr) * 1000;
  else if (tiempoStr.endsWith('m')) ms = parseInt(tiempoStr) * 60 * 1000;
  else if (tiempoStr.endsWith('h')) ms = parseInt(tiempoStr) * 60 * 60 * 1000;
  else return conn.reply(m.chat, `⛔ Usa un tiempo válido con 's', 'm' o 'h'\nEj: 30s | mensaje`, m);

  if (isNaN(ms) || ms <= 0 || ms > 1000 * 60 * 60 * 12) {
    return conn.reply(m.chat, `❌ El tiempo debe ser entre 1s y 12h máximo`, m);
  }

  await conn.reply(m.chat, `✅ Recordatorio programado en *${tiempoStr}*\n⏳ Esperando para enviar tu mensaje...`, m);

  setTimeout(() => {
    conn.sendMessage(m.chat, {
      text: `🔔 *Recordatorio:*\n${mensaje}`
    });
  }, ms);
};

handler.help = ['recordatorio <tiempo> | <mensaje>'];
handler.tags = ['canal'];
handler.command = ['recordatorio', 'remindme'];
handler.register = true;
handler.channel = true;

export default handler;
