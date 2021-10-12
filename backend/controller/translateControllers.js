const translate = require("node-google-translate-skidz");

class TranslateController {
  static async postTranslate(req, res) {
    try {
      const { text, source, target } = req.body;

      if (text === "")
        res.status(422).json({ msg: "fail", error: "Pesan kososng" });

      const result = await translate({
        text,
        source,
        target,
      });

      res.status(200).json({ msg: "ok", translation: result.translation });
    } catch (error) {
      console.log("error", error);
      res.status(422).json({ msg: "fail", error: error.message });
    }
  }
}

module.exports = TranslateController;
