import PencilWS from "./PencilWS";
import EraserWS from "./EraserWS";
import RectangleWS from "./RectangleWS";
import EllipseWS from "./EllipseWS";
import LineWS from "./LineWS";

export default function WSDraw(canvas, data) {
    const types = [PencilWS, EraserWS, RectangleWS, EllipseWS, LineWS];
    const tool = eval("new " + data.tool + "WS(canvas, data)");
    tool.draw();
}