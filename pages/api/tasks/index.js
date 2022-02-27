const JSONdb = require("simple-json-db");
export const db = new JSONdb("./pages/api/db.json");

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      res.status(200).json(db.get("tasks"));
      break;
    }
    case "POST": {
      //Parse stringfied body
      const body = JSON.parse(req.body);

      let missingFields = [];
      if (!body.title) missingFields.push("title");

      if (missingFields.length === 0) {
        let data = db.get("tasks");
        let task = {
          id: Date.now(),
          title: null,
          memo: null,
          checked: false,
          pinned: false,
        };

        if ("title" in body) {
          task.title = body.title;
        }

        if ("memo" in body) task.memo = body.memo;

        data.push(task);
        db.set("tasks", data);

        res.status(201).json(task);
      } else {
        res.status(400).json({
          message: `There is missing fields: ${missingFields.join(", ")}`,
        });
      }

      break;
    }
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
