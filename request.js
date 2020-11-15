const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const normalize = (data, filter, out_min, out_max) => {
    var res = data.map(x => x);
    // for (var i=0; i < data.length; i++) { res.push(data[i]); }

    var min = d3.min(res, e => e[filter]), max = d3.max(res, e => e[filter]);
    for (var i = 0; i < res.length; i++) { res[i][filter] = scale(res[i][filter], min, max, out_min, out_max); }

    return res;
}

class Selector {
    constructor(data, filters, range=60, width=800, height=800) {
        this.data = data.map(x => x);
        this.display_data;
        // map data into the range [0,60]
        var that = this;
        // filters.forEach(function (filter,i) {
        //     that.display_data = normalize(data, filter, 0, range);
        // });
        this.display_data = data;

        console.log("DISPLAY : ", this.display_data);
        console.log("REAL : ", this.data);
        // init svg for sphere and information board
        this.svg = d3.select("svg")
            .attr("id", "world")
            .attr("width", width)
            .attr("height", height)
            .append("g").attr("id", "sphere");

        this.information = new Information(width, height);
        this.map = new Sphere(this.display_data, this.data, filters[0], this.information, range=range, width=width, height=height);
        this.div = d3.select("#maincontent").append("div")
            .attr("id", "selector");
        this.table = this.div.append("table");

        // TODO
        var description = [
            "",
            "",
            ""
        ];
        for (var i in filters) {
            var filter = filters[i];

            var info = this.information;
            var sphere = this.map;
            
            var tr = this.table.append("tr");
            tr.append("input")
                .attr("type","checkbox")
                .attr("id", filter)
                .attr("name", filter)
                .attr("value", filter)
                .property("checked", d => (filter == filters[0]) ? true : false)
                .on("click", function() {
                    console.log(this, this.id);
                    d3.selectAll("input").property("checked", false);
                    d3.select("#" + this.id).property("checked", true);
                    sphere.removeMap();
                    info.init();
                    sphere = new Sphere(that.display_data, that.data, this.id, info, range=range, width=width, height=height);
                });
            tr.append("label")
                .attr("for", filter)
                .text(filter.toUpperCase());
            tr.append("text").attr("id", "description")
                .text(description[i]);
        }
    }
}