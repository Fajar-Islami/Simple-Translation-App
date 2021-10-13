const translate = require("node-google-translate-skidz");

class TranslateController {
  static async postTranslate(req, res) {
    try {
      const { text, source, target } = req.body;

      if (text === "")
        res.status(422).json({ message: "fail", error: "Pesan kososng" });

      const result = await translate({
        text,
        source,
        target,
      });

      res.status(200).json({
        message: "ok",
        translation: result.translation,
        spell: result.spell && result.spell.spell_res,
        spell_html: result.spell && result.spell.spell_html_res,
      });
    } catch (error) {
      console.log("error", error);
      res.status(422).json({ message: "fail", error: error.message });
    }
  }
}

module.exports = TranslateController;
