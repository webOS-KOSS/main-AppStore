import kind from "@enact/core/kind";
import Proptypes from "prop-types";

import css from "./Tile.module.less";
import thumbnail from "../../icon.png";

const descs = ["asdf", "asdfsab"];

const TileBase = kind({
  name: "TileBase",

  styles: {
    css,
    className: "tile-box",
  },

  propTypes: {
    children: Proptypes.string,
    desc: Proptypes.string,
    size: Proptypes.number,
  },

  defaultProps: {
    size: 200,
  },

  render: ({ children, size, ...rest }) => {
    return (
      <div {...rest}>
        <div className={css.tile}>
          <div className={css.img}>
            <img src={thumbnail} width={size} height={size} />
          </div>
          <div className={css.appName}>{children}</div>
        </div>
        <div className={css.desc}>{descs[0]}</div>
      </div>
    );
  },
});

const Tile = TileBase;

export default TileBase;
export { Tile, TileBase };
