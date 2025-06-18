export default function (graph) {
  graph.use(
    new Transform({
      resizing: true,
      rotating: true,
    })
  );
}