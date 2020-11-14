class Sphere {
    constructor() {
        d3.select("#maincontent").append("div").attr("id", "map");

        this.width = 800, this.height = 800;

        this.projection = d3.geoOrthographic()
            .scale(350)
            .translate([this.width / 2, this.height / 2])
            .clipAngle(90) // sans cette option les pays de l'autre côté du globle sont visibles
            .precision(.1)
            .rotate([0,0,0]);

        this.path = d3.geoPath()
            .projection(this.projection);

        this.svg = d3.select("#map").append("svg")
            .attr("id", "world")
            .attr("width", this.width)
            .attr("height", this.height);

        this.graticule = d3.geoGraticule();
        this.svg.append("path")
            .datum(this.graticule)
            .attr("class", "graticule")
            .attr("d", this.path);

        this.lambda = d3.scaleLinear()
            .domain([0, this.width])
            .range([-180, 180]);

        this.phi = d3.scaleLinear()
            .domain([0, this.height])
            .range([90, -90]);

        const that = this;
        d3.json("data_samples/world-countries.json").then(function(collection) {
            var countries = that.svg.selectAll("path")
                .data(collection.features)
                .enter().append("path")
                .attr("d", that.path)
                .attr("class", "country")
                .attr("id", d => d.id);

        });

        this.draw([]);

        var drag = d3.drag().subject(function() {
            var r = that.projection.rotate();
            return {
                x: that.lambda.invert(r[0]),
                y: that.phi.invert(r[1])
            };
        }).on("drag", function() {
            that.projection.rotate([that.lambda(d3.event.x), that.phi(d3.event.y)]);

            that.svg.selectAll(".graticule")
                .datum(that.graticule)
                .attr("d", that.path);
            
            that.svg.selectAll(".country")
                .attr("d", that.path);
        });

        this.svg.call(drag);
    }

    draw(data, filter="pib") {
        const that = this;
        var quantile = d3.scaleQuantile().domain([
                d3.min(data, e => +e[filter]),
                d3.max(data, e => +e[filter])
            ]).range(d3.range(60));

        var legend = that.svg.append('g')
            .attr('transform', 'translate(35, 10)')
            .attr('id', 'legend');
            
        legend.selectAll('.colorbar') // LIGNE 11
            .data(d3.range(60))
            .enter().append('rect')
            .attr('y', d => d * 5 + 'px')
            .attr('height', '5px')
            .attr('width', '20px')
            .attr('x', '0px')
            .attr("style" , function (d) { // d3 colorScale
                // return "fill:" + color(d[filter]);
                return "";
            });
        
        var legendScale = d3.scaleLinear()
            .domain([d3.min(data, e => +e[filter]), d3.max(data, e => +e[filter])])
            .range([0, 60 * 5]);
            
        that.svg.append("g")
            .attr('transform', 'translate(25, 10)')
            .call(d3.axisLeft(legendScale).ticks(10));
        
        // data.forEach(function(e,i) {
        //     var q = quantile(+e[filter]);
        //     console.log("TEMP : " + +e[filter], q, ""+q);
        //     d3.select("#" + e.pays) // LIGNE 29
        //         .attr("class", e => "country temperature-" + q);
        // });
    }
}

