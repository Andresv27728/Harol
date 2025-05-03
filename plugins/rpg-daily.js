/**
 * ⋆｡˚ ☁︎｡⋆｡ ˚☽˚｡⋆ ✦ ⋆｡˚☁︎｡⋆｡ ˚☽˚｡⋆ ✦
 * 
 * 𝐓𝐨𝐢𝐥𝐞𝐭-𝐁𝐨𝐮𝐧𝐝 𝐇𝐚𝐧𝐚𝐤𝐨-𝐤𝐮𝐧 𝐑𝐞𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚 𝐃𝐢𝐚𝐫𝐢𝐚
 * 
 * "Cada día, Hanako-kun deja pequeños obsequios para
 * sus fieles asistentes en el Reino Espiritual..."
 * 
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃        七不思議        ┃
 * ┃   Los Siete Misterios   ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * 
 * ⋆｡˚ ☁︎｡⋆｡ ˚☽˚｡⋆ ✦ ⋆｡˚☁︎｡⋆｡ ˚☽˚｡⋆ ✦
 */

import moment from 'moment-timezone'
import fetch from 'node-fetch'

// ✧ El emoji que representa el sello de Hanako-kun
const emojiHanako = '🇯🇵'
// ✧ El emoji para las advertencias de tiempo
const emojiTiempo = '⏳'
// ✧ La moneda del Reino Espiritual
const moneda = 'MayCoins'

let handler = async (m, { conn }) => {
    // ✧ Generar recompensas místicas con valores aleatorios
    let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100
    let exp = Math.floor(Math.random() * (500 - 100 + 1)) + 100
    let d = Math.floor(Math.random() * (500 - 100 + 1)) + 100
    
    // ✧ Obtener el nombre del usuario para personalizar mensaje
    const user = global.db.data.users[m.sender]
    const name = user.name || conn.getName(m.sender)
    
    // ✧ Verificar si ya reclamó su recompensa
    let time = user.lastclaim + 7200000 // 2 horas en milisegundos
    if (new Date() - user.lastclaim < 7200000) {
        // ✧ Si intenta reclamar antes de tiempo, Hanako-kun le advertirá
        return conn.reply(
            m.chat, 
            `${emojiTiempo} *Los espíritus necesitan descansar...*
            
❀ Vuelve en ${msToTime(time - new Date())} para recibir más obsequios, ${name}-kun.
            
"La paciencia es una virtud incluso en el mundo espiritual..."`, 
            m
        )
    }
    
    // ✧ Otorgar las bendiciones si el tiempo ha pasado
    global.db.data.users[m.sender].diamond += d
    global.db.data.users[m.sender].coin += coin
    global.db.data.users[m.sender].exp += exp
    
    // ✧ Crear el mensaje de recompensa con estilo Hanako-kun
    const mensajeRecompensa = `
╭─「 ⋆｡˚☽˚｡⋆ 𝑶𝒃𝒔𝒆𝒒𝒖𝒊𝒐 𝑬𝒔𝒑𝒊𝒓𝒊𝒕𝒖𝒂𝒍 ⋆｡˚☽˚｡⋆ 」─╮
│    
│ ୨୧ *Asistente:* ${name}
│    
├─ ✧ 𝑩𝒆𝒏𝒅𝒊𝒄𝒊𝒐𝒏𝒆𝒔 𝑶𝒕𝒐𝒓𝒈𝒂𝒅𝒂𝒔:
│ ✦ *${moneda}:* +${coin}
│ ✨ *Energía Espiritual:* +${exp}
│ 💎 *Gemas Místicas:* +${d}
│    
│ 📜 *Fecha:* ${moment().format('YYYY-MM-DD HH:mm:ss')}
│    
╰─「 ⋆｡˚☽˚｡⋆ ✧ ⋆｡˚☽˚｡⋆ 」─╯
`.trim()

    // ✧ Agregar reacción mística
    await m.react(emojiHanako)
    
    // ✧ Enviar mensaje al usuario con diseño temático
    await conn.sendMessage(m.chat, {
        text: mensajeRecompensa,
        contextInfo: {
            externalAdReply: {
                title: '✧ Obsequio Diario de Hanako-kun ✧',
                body: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R',
                thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg',
                sourceUrl: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R',
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })
    
    // ✧ Notificar al Reino Espiritual (canal de notificaciones)
    const reinoEspiritual = '120363372883715167@newsletter'
    
    // ✧ Crear mensaje para el canal
    const mensajeCanal = `
╭─「 ❀ 𝑹𝒆𝒄𝒐𝒎𝒑𝒆𝒏𝒔𝒂 𝑬𝒏𝒕𝒓𝒆𝒈𝒂𝒅𝒂 ❀ 」─╮
│ 🗨️ *Recompensa:* Diaria
│ ୨୧ *Asistente:* ${name}
│ 📱 *Número:* wa.me/${m.sender.split('@')[0]}
│
├─ ✧ 𝑩𝒆𝒏𝒅𝒊𝒄𝒊𝒐𝒏𝒆𝒔:
│ ✦ ${moneda}: +${coin}
│ ✨ Energía Espiritual: +${exp}
│ 💎 Gemas Místicas: +${d}
│
│ 📜 *Fecha:* ${moment().format('YYYY-MM-DD HH:mm:ss')}
╰─「 𝑷𝒐𝒓 𝒍𝒐𝒔 𝑺𝒊𝒆𝒕𝒆 𝑴𝒊𝒔𝒕𝒆𝒓𝒊𝒐𝒔 」─╯

> Reclama tu recompensa diaria con *_.diario_*.`
    
    // ✧ Intento de comunicación con el Reino Espiritual
    try {
        if (global.conn?.sendMessage) {
            // ✧ Intentar obtener la foto de perfil, si falla usar la de Hanako
            const pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
            
            await global.conn.sendMessage(reinoEspiritual, {
                image: { url: pp },
                caption: mensajeCanal
            })
        }
    } catch (e) {
        console.error('✧ Error al notificar al Reino Espiritual:', e)
    }
    
    // ✧ Actualizar el tiempo de reclamo
    global.db.data.users[m.sender].lastclaim = Date.now()
}

// ✧ Comandos aceptados para invocar la recompensa diaria
handler.help = ['daily', 'claim', 'diario']
handler.tags = ['rpg']
handler.command = ['daily', 'diario', 'claim', 'reclamar', 'obsequio']
handler.group = true
handler.register = true

export default handler

/**
 * ✧ Convertir milisegundos a formato de tiempo legible
 */
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
    hours = (hours < 10) ? '0' + hours : hours
    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds
    
    return hours + ' Horas ' + minutes + ' Minutos'
}

/**
 * ─────────────────────────────────
 *      ╭──❁ Hanako-kun ❁──╮
 *      │ "Acepta este regalo│
 *      │  como muestra de   │
 *      │  nuestro pacto..." │
 *      ╰──────✦❘✦──────╯
 * ─────────────────────────────────
 */
