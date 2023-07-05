
require('dotenv').config()
const token = process.env.DISCORD_TOKEN;

const { 
    Client, 
    GatewayIntentBits,
    PermissionsBitField
} = require("discord.js")

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages
    ]
})

//Reaction
client.on("interactionCreate", async interaction => {
	if (!interaction.isButton()) return
    if (!interaction.customId.startsWith(`interaction_button`)) return
    if (interaction.user.id === interaction.guild.ownerId) {
        interaction.reply({ content: 'ちゅ:two_hearts:', ephemeral: true })
        console.log('chu_chu_chu')
        return
    }
	const me = await interaction.guild.members.fetchMe()
    if (!me.permissions.has(PermissionsBitField.Flags.ManageNicknames)){
        console.log('botにNicknameの管理の権限がありません')
        return
	}
    const member = await interaction.guild.members.fetch(interaction.user.id)
    const nn = member.nickname || member.user.username
    if (nn.startsWith('👀')) {
        try {
            const nnn = nn.slice(2)
            await member.setNickname(`${nnn}`)
            interaction.reply({ content: '👀はずしたよ', ephemeral: true })
            console.log('%s', nnn)
        } catch (error) {
            console.log(error)
            interaction.reply({ content: '失敗したみたい', ephemeral: true })
        }
        return
    }
    try {
        await member.setNickname(`👀${nn}`)
        interaction.reply({ content: '👀つけたよ', ephemeral: true })
        console.log('%s', nn)
    } catch (error) {
    console.log(error)
    interaction.reply({ content: '失敗したみたい', ephemeral: true })
    }

})

client.once('ready', () => {
    console.log('Bot is ready!')
})

client.login(token);
