import { DataTypes } from "sequelize";
import { SqlModel } from "@mayajs/sql";

const schema = {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default SqlModel("user", schema, {});
