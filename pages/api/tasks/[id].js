import { db } from "./index";

export default function handler(req, res) {
  if (req.query.id) {
    switch (req.method) {
      case "GET": {
        let data = db.get("tasks");
        let index = data.findIndex(
          (data) => data.id === parseInt(req.query.id)
        );

        if (index > -1) {
          res.status(200).json(data[index]);
        } else {
          res.status(404).json({ message: "Not Found" });
        }

        break;
      }
      case "PATCH": {
        let data = db.get("tasks");
        let index = data.findIndex(
          (data) => data.id === parseInt(req.query.id)
        );
        const reqBody = JSON.parse(req.body);
        if (index > -1) {
          if ("title" in reqBody) data[index].title = body.title;
          if ("memo" in reqBody) data[index].memo = reqBody.memo;
          if ("checked" in reqBody) data[index].checked = reqBody.checked;
          if ("pinned" in reqBody) data[index].pinned = reqBody.pinned;

          db.set("tasks", data);
          res.status(200).json(data[index]);
        } else {
          res.status(404).json({ message: "Not Found" });
        }

        break;
      }
      case "DELETE": {
        let data = db.get("tasks");
        let index = data.findIndex(
          (data) => data.id === parseInt(req.query.id)
        );

        if (index > -1) {
          let response = data[index];
          data.splice(index, 1);
          db.set("tasks", data);
          res.status(200).json(response);
        } else {
          res.status(404).json({ message: "Not Found" });
        }

        break;
      }
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } else res.status(404).json({ message: "Not Found" });
}
