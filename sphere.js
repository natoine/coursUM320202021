class Sphere {
    constructor (display_data, information_data, filter, information, range=60, width=800, height=800) {
        // d3.select("#maincontent").append("div").attr("id", "map");
        this.width = width, this.height = height;

        this.projection = d3.geoOrthographic()
            .scale(350)
            .translate([this.width / 2, this.height / 2])
            .clipAngle(90) // sans cette option les pays de l'autre côté du globle sont visibles
            .precision(.1)
            .rotate([0,0,0]);

        this.path = d3.geoPath()
            .projection(this.projection);

        this.svg = d3.select("#world");

        this.graticule = d3.geoGraticule();

        var xoff = 50, yoff = 10;
        this.svg.append("path")
            .attr("transform", "translate(" + xoff + ',' + yoff + ')')
            .datum(this.graticule)
            .attr("class", "graticule")
            .attr("d", this.path);

        this.lambda = d3.scaleLinear()
            .domain([0, this.width])
            .range([-180, 180]);

        this.phi = d3.scaleLinear()
            .domain([0, this.height])
            .range([90, -90]);

// ****************** DRAW IN BETWEEN ***************************** //
    var that = this;
    // draw color on countries;
    var colorArray = d3.range(0, 1 + 1 / range, 1 / (range - 1)).map(function(d) {
        return d3.interpolateRdBu(d);
    });

    var quantile = d3.scaleQuantile().domain([
            d3.min(display_data, e => e[filter]),
            d3.max(display_data, e => e[filter])
        ]).range(d3.range(range));

    // DRAW COUNTRIES ONTO THE MAP
    d3.json("data_samples/world-countries.json").then(function(collection) {
        var xoff = 50, yoff = 10;
        // console.log(data);
        var countries = that.svg.selectAll("path")
            .data(collection.features)
            .enter().append("path")
                .attr("transform", "translate(" + xoff + ',' + yoff + ')')
                .attr("d", that.path)
                .attr("class", "country")
                .attr("id", d => d.id)  
                .style("fill", function(d) { // apply color to the country in function of data and filter choosen
                    var c = "black";
                    for (var i=0; i < display_data.length; i++) {
                        if (display_data[i].country === d.id) {
                            var q = quantile(display_data[i][filter]);
                            c = colorArray[q];
                        }
                    }
                    return c;
                }) // opacity only determined if data on country is present
                .style("opacity", function(d) {
                    var c = 0.4;
                    for (var i=0; i < display_data.length; i++) {
                        if (display_data[i].country == d.id) { c = 0.6; }
                    }
                    return c;
                })
                .on("mouseover", function(d) {
                    d3.select("#" + d.id).style("opacity", 1);
                    var msg = d.properties.name + " : ";
                    var value = "NO DATA ON ";
                    for (var i=0; i < information_data.length; i++) {
                        if (information_data[i].country === d.id) { value = information_data[i][filter] + " USD IN "; }
                    }
                    msg += value;
                    msg += filter.toUpperCase();
                    information.changeText(msg);
                    // d3.select("text#information").text();
                })
                .on("mouseout", function(d) {
                    var c = 0.4;
                    for (var i=0; i < display_data.length; i++) {
                        if (display_data[i].country == d.id) { c = 0.6; }
                    }
                    d3.select("#" + d.id).style("opacity", c);
                    information.hide();
                });

        // DRAW LEGEND SCALE
        var xoff = 50, yoff = 10;
        var legend = that.svg.append('g')
            .attr('transform', 'translate(' + (xoff+5) + ',' + yoff + ')')
            .attr('id', 'legend');

        legend.selectAll('.colorbar') // LIGNE 11
            .data(d3.range(range))
            .enter().append('rect')
            .attr('y', d => d * 5 + 'px')
            .attr('height', '5px')
            .attr('width', '20px')
            .attr('x', '0px')
            .style("fill" , d => colorArray[d]);

        var legendScale = d3.scaleLinear()
            .domain([d3.min(display_data, e => e[filter]), d3.max(display_data, e => e[filter])])
            .range([0, 60 * 5]);

        that.svg.append("g")
            .attr('transform', 'translate(' + xoff + ',' + yoff + ')')
            .call(d3.axisLeft(legendScale).ticks(10));
    });

    // ADD TITLE
    this.svg.append("g")
        .attr("id", "title")
        .attr("transform", "translate(" + width/2.25 + ", 25)")
        .append("text").text(filter.toUpperCase() + " of different countries in the world");
// ****************** DRAW IN BETWEEN ***************************** //

    // DRAG FUNTIONNALITY
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

    removeMap() {
        d3.select("#map").remove();
    }

}

class Information {
    constructor (width=800, height=800) {
        var xoff = width * 0.5, yoff = height - 30;
        this.g = d3.select("svg").append("g")
            .attr("transform", "translate(" + xoff + "," + yoff + ")");
        // this.rect = this.g.append("rect")
        //         .attr("id", "information")
        //         .attr("class", "rect")
        //         .attr("x", 0)
        //         .attr("y", 0)
        //         .attr("width", width/4)
        //         .attr("height", height/8)
        //         .style("visibility", "visible");
        this.text = this.g.append("text")
                .attr("id", "information")
                .attr("class", "text")
                .style("visibility", "visible");
    }

    changeText(msg) {
        this.text.text(msg);
        this.text.style("visibility", "visible");
        this.rect.style("visibility", "visible");
    }

    hide() {
        this.rect.style("visibility","hidden");
        this.text.style("visibility","hidden");
    }
}
