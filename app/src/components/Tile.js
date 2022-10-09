import kind from "@enact/core/kind";
import Proptypes from "prop-types";
import Button from "@enact/sandstone/Button";

import css from "./Tile.module.less";
import thumbnail from "../../icon.jpeg";
import { useState } from "react";

const Btn = () => {
  const [toggle, chToggle] = useState(false);

  return (
    <div className={css.btn}>
      <Button onClick={() => chToggle(!toggle)}>
        {toggle ? "remove" : "install"}
      </Button>
    </div>
  );
};

const descs = {
  배달: "배달 물품 도난 방지를 위해 어쩌구 저쩌구 이러쿵 저러쿵..",
  차량: "가정에 손님이 방문할 때 거주민이 아닌 차량이라서 별도의 인증 절차를 걸쳐야 하는 번거러움을 해결 ...",
  cctv: "그냥 cctv로 방법에 유용할듯 대충 뭐 그런거임",
  가전제어:
    "집이 넓으면 월패드에서 전등, 창문 뭐 그런거 작동할 수 있음. 기상 특보랑 게시판에서 나오는 이벤트에 맞춰서 예약도 가능함.",
  운동보조: "카메라 api가 하자 있어서 삽질 개같이 함",
};

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
          <div className={css.icon}>
            <img
              className={css.img}
              src={thumbnail}
              width={size}
              height={size}
            />
            <div className={css.appName}>{children}</div>
          </div>
          <div className={css.desc}>{descs[children]}</div>
          <Btn />
        </div>
      </div>
    );
  },
});

const Tile = TileBase;

export default TileBase;
export { Tile, TileBase };
