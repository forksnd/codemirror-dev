import {EditorState, Plugin, StateField} from "../state/src/state"
import {EditorView, Decoration, DecorationSet} from "../view/src/view"

let field = new StateField<DecorationSet>({
  init() {return DecorationSet.of([
    Decoration.range(0, 2, {attributes: {style: "color: red"}, inclusiveEnd: true}),
    Decoration.range(4, 5, {attributes: {style: "color: blue"}, inclusiveStart: true}),
    Decoration.range(9, 12, {attributes: {style: "color: orange"}})
  ])},
  apply(tr, decos) { return decos.map(tr.changes) }
})
let decos = new Plugin({
  state: field,
  props: {
    decorations(state) { return state.getField(field) }
  }
})

let state = EditorState.create({doc: "one\ntwo\nthree", plugins: [decos]})
let view = window.view = new EditorView(state) 
document.body.appendChild(view.dom)