class Sphere {
    constructor(width=800, height=800) {
        d3.select("#maincontent").append("div").attr("id", "map");
        this.colorScale = d3.cdmlgh
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

            // draw color on countries;
        });

        console.log("SELECT", d3.select("#AUS"));
        // this.draw([]);

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

    draw(data, filter="pib", range=60) {
        var colorArray = d3.range(0, 1 + 1 / range, 1 / (range - 1)).map(function(d) {
            return d3.interpolateRdBu(d);
        });

        var quantile = d3.scaleQuantile().domain([
                d3.min(data, e => +e[filter]),
                d3.max(data, e => +e[filter])
            ]).range(d3.range(range));

        var legend = this.svg.append('g')
            .attr('transform', 'translate(35, 10)')
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
            .domain([d3.min(data, e => e[filter]), d3.max(data, e => e[filter])])
            .range([0, 60 * 5]);
            
        this.svg.append("g")
            .attr('transform', 'translate(25, 10)')
            .call(d3.axisLeft(legendScale).ticks(10));
        

        for (var i=0; i < data.length; i++) {
            var e = data[i];
            console.log(e, e.country);
            var q = colorArray[quantile(e[filter])];
            // d3.select("#" + e.country) // LIGNE 29
            //     .style("fill", q);
            document.getElementById(e.country).style.fill = q;
        }

        // data.forEach(function(e,i) {
        //     var q = colorArray[quantile(e[filter])];
        //     console.log("TEMP [" + e.country + "] : " + e[filter], q);
        //     var id = "#" + e.country;
        //     d3.select(id) // LIGNE 29
        //         .style("fill", q);
        // });
    }
}

class Sphere {
    constructor (width=800, height=800) {
        d3.select("#maincontent").append("div").attr("id", "map");
        this.width = width, this.height = height;

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

// ****************** DRAW IN BETWEEN ***************************** //
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

    createMap(data, filter="pib", range=60) {
        var that = this;
        d3.json("data_samples/world-countries.json").then(function(collection) {
            var countries = that.svg.selectAll("path")
                .data(collection.features)
                .enter().append("path")
                    .attr("d", that.path)
                    .attr("class", "country")
                    .attr("id", d => d.id);

            // draw color on countries;
            var colorArray = d3.range(0, 1 + 1 / range, 1 / (range - 1)).map(function(d) {
                return d3.interpolateRdBu(d);
            });
    
            var quantile = d3.scaleQuantile().domain([
                    d3.min(data, e => e[filter]),
                    d3.max(data, e => e[filter])
                ]).range(d3.range(range));
    
            var legend = that.svg.append('g')
                .attr('transform', 'translate(35, 10)')
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
                .domain([d3.min(data, e => e[filter]), d3.max(data, e => e[filter])])
                .range([0, 60 * 5]);

            this.svg.append("g")
                .attr('transform', 'translate(25, 10)')
                .call(d3.axisLeft(legendScale).ticks(10));

            data.forEach(function(e,i) {
                var q = colorArray[quantile(e[filter])];
                console.log("TEMP [" + e.country + "] : " + e[filter], q);
                var id = "#" + e.country;
                d3.select(id) // LIGNE 29
                    .style("fill", q);
            });
        });
    }

    removeMap() {
        d3.select("#legende").remove();
        d3.select(".colorbar").remove();
        d3.select(".country").remove();
    }

}