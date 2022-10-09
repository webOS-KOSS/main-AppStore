import kind from "@enact/core/kind";
import { Panel, Header } from "@enact/sandstone/Panels";
import Scroller from "@enact/sandstone/Scroller";
import Repeater from "@enact/ui/Repeater";
import Tile from "../components/Tile";
import Proptypes from "prop-types";

const Tiles = kind({
  name: "Tiles",

  propTypes: {
    children: Proptypes.array,
  },

  render: ({ children, rest }) => (
    <Panel {...rest}>
      <Header title="Apps" />
      <Scroller>
        <Repeater childComponent={Tile} indexProp="index">
          {children}
        </Repeater>
      </Scroller>
    </Panel>
  ),
});

export default Tiles;
