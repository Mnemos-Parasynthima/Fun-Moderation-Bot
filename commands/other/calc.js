const { inspect } = require("util");
var Fraction = require("fractional").Fraction;

module.exports = {
    config: {
        name: "calc",
        aliases: ["calculate", "eval", "evaluate"],
        usage: "$calc <mathematical equation>",
        description: "Calculate a mathematical equation",
        permissions: "none"
    },
    run: async (bot, message, args) => {
        let cmd = message.content.split(" ")[0];
        if (args[0] == "help") return message.channel.send(`Usage: ${cmd} (mathematical expression) \n Example: ${cmd} 2 + 2  \n Example 2: ${cmd} round 7/8 + 2/8`);
        if (!args[0]) return message.channel.send("Mathematical Expression not found, type $calc help for more info on this.");
        let evaled;
        try {
            if (args[0] == "round") {
                if (!args[1]) return message.channel.send("Mathematical Expression not found, type $calc help for more info on this.");
                args.shift();
                evaled = await eval(args.join(' '));
                evaled = round(evaled, 2);
                let frac = new Fraction(evaled);
                frac = frac.toString();
                message.channel.send(inspect(evaled));
                message.channel.send("/ (Fraction is also rounded)");
                message.channel.send(inspect(frac));
            } else {
                evaled = await eval(args.join(' '));
                if (evaled % 1 != 0) {
                    let frac = new Fraction(evaled);
                    frac = frac.toString();
                    message.channel.send(inspect(evaled));
                    message.channel.send("/");
                    message.channel.send(inspect(frac));
                } else {
                    message.channel.send(inspect(evaled));
                }
            }
        } catch {
            message.reply("An error occurred, are you using the command right? type $calc help to find the command syntax.");
        }
        function round(num, places) {
            var multiplier = Math.pow(10, places);
            return Math.round(num * multiplier) / multiplier;
        }
    }
}