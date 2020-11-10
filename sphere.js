// const {DOM} = new observablehq.Library;
// var width = document.body.clientWidth, height = document.body.clientHeight;

// chart = function () {
//     const context = DOM.context2d(width, height);
//     const path = d3.geoPath(projection, context);
  
//     function render(land) {
//       context.clearRect(0, 0, width, height);
//       context.beginPath(), path(sphere), context.fillStyle = "#fff", context.fill();
//       context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
//       context.beginPath(), path(sphere), context.stroke();
//     }
  
//     return d3.select(context.canvas)
//       .call(drag(projection)
//           .on("drag.render", () => render(land110))
//           .on("end.render", () => render(land50)))
//       .call(() => render(land50))
//       .node();
// }

// function drag(projection) {
//     let v0, q0, r0, a0, l;
  
//     function pointer(event, that) {
//       const t = d3.pointers(event, that);
  
//       if (t.length !== l) {
//         l = t.length;
//         if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
//         dragstarted.apply(that, [event, that]);
//       }
  
//       // For multitouch, average positions and compute rotation.
//       if (l > 1) {
//         const x = d3.mean(t, p => p[0]);
//         const y = d3.mean(t, p => p[1]);
//         const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
//         return [x, y, a];
//       }
  
//       return d3.pointer(event, that);
//     }
  
//     function dragstarted(event) {
//       v0 = versor.cartesian(projection.invert(pointer(event, this)));
//       q0 = versor(r0 = projection.rotate());
//     }
  
//     function dragged(event) {
//       const p = pointer(event, this);
//       const v1 = versor.cartesian(projection.rotate(r0).invert(p));
//       const delta = versor.delta(v0, v1);
//       let q1 = versor.multiply(q0, delta);
  
//       // For multitouch, compose with a rotation around the axis.
//       if (p[2]) {
//         const d = (p[2] - a0) / 2;
//         const s = -Math.sin(d);
//         const c = Math.sign(Math.cos(d));
//         q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
//       } 
  
//       projection.rotate(versor.rotation(q1));
  
//       // In vicinity of the antipode (unstable) of q0, restart.
//       if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
//     }
  
//     return d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged);
// }

// projection = d3[projectionName]().precision(0.1);

// height = function () {
//     const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
//     const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
//     projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
//     return dy;
// }

// sphere = ({type: "Sphere"});
// // land50 = FileAttachment("land-50m.json").json().then(world => topojson.feature(world, world.objects.land));
// // land110 = FileAttachment("land-110m.json").json().then(world => topojson.feature(world, world.objects.land));

// // versor = require("versor@0.0.3");
// // topojson = require("topojson-client@3");


const width = 800, height = 800;

const projection = d3.geoOrthographic()
    .scale(350)
    .translate([width / 2, height / 2])
    .clipAngle(90) // sans cette option les pays de l'autre côté du globle sont visibles
    .precision(.1)
    .rotate([0,0,0]);

const path = d3.geoPath()
    .projection(projection);

const svg = d3.select("#map").append("svg")
    .attr("id", "world")
    .attr("width", width)
    .attr("height", height);

const graticule = d3.geoGraticule();
svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


const lambda = d3.scaleLinear()
    .domain([0, width])
    .range([-180, 180]);

const phi = d3.scaleLinear()
    .domain([0, height])
    .range([90, -90]);
  
    var drag = d3.drag().subject(function() {
    var r = projection.rotate();
    return {
        x: lambda.invert(r[0]),
        y: phi.invert(r[1])
    };
}).on("drag", function() {
    projection.rotate([lambda(d3.event.x), phi(d3.event.y)]);

    svg.selectAll(".graticule")
        .datum(graticule)
        .attr("d", path);
    
    svg.selectAll(".country")
        .attr("d", path);
});

svg.call(drag);

d3.json("data_samples/world-countries.json").then(function(collection) {
  var countries = svg.selectAll("path")
      .data(collection.features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", "country")
      .attr("id", d => d.id);
});