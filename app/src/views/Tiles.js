import kind from "@enact/core/kind";
import { Panel, Header } from "@enact/sandstone/Panels";
import Scroller from "@enact/sandstone/Scroller";
import Repeater from "@enact/ui/Repeater";
import LS2Request from "@enact/webos/LS2Request";
import Tile from "../components/Tile";
import Proptypes from "prop-types";
import css from "./Tiles.module.less";

const Tiles = kind({
  name: "Tiles",

  propTypes: {
    children: Proptypes.array,
    close: Proptypes.func,
  },

  render: ({ children, rest }) => (
    <Panel className={css.gnd} {...rest}>
      <Header className={css.gnd} title="Home++ App Store"/>
      <Scroller direction="vertical">
        <Repeater childComponent={Tile} indexProp="index">
          {children}
        </Repeater>
        <p className={css.madeby}>Copyright © 2022 방파제</p>
      </Scroller>
    </Panel>
  ),
});

export default Tiles;
