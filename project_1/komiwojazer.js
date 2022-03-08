var xmlHttp;

function Path(points) {
    this.points = points;
    this.order = new Array(points.length);

    for(var i = 0; i < points.length; i++) this.order[i] = i;

    this.distances = new Array(points.length * points.length);

    for(var i = 0; i < points.length; i++)
        for(var j = 0; j < points.length; j++)
            this.distances[j + i * points.length] = distance(points[i], points[j]);
}

Path.prototype.change = function(temp) {
    var i = this.randomPos(), j = this.randomPos();
    var delta = this.delta_distance(i, j);

    if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
        this.swap(i,j);
    }
};

Path.prototype.size = function() {
    var s = 0;
    for (var i = 0; i<this.points.length; i++) {
        s += this.distance(i, ((i + 1)%this.points.length));
    }
    return s;
};

Path.prototype.swap = function(i,j) {
    var tmp = this.order[i];
    this.order[i] = this.order[j];
    this.order[j] = tmp;
};

Path.prototype.delta_distance = function(i, j) {
    var jm1 = this.index(j - 1),
        jp1 = this.index(j + 1),
        im1 = this.index(i - 1),
        ip1 = this.index(i + 1);

    var s = 
        this.distance(jm1, i)
      + this.distance(i, jp1)
      + this.distance(im1, j)
      + this.distance(j, ip1)
      - this.distance(im1, i)
      - this.distance(i, ip1)
      - this.distance(jm1, j)
      - this.distance(j, jp1);

    if (jm1 === i || jp1 === i)
        s += 2*this.distance(i, j); 
    return s;
};

Path.prototype.index = function(i) {
    return (i + this.points.length) % this.points.length;
};

Path.prototype.access = function(i) {
    return this.points[this.order[this.index(i)]];
};

Path.prototype.distance = function(i, j) {
    return this.distances[this.order[i] * this.points.length + this.order[j]];
};

Path.prototype.randomPos = function() {
    return 1 + Math.floor(Math.random() * (this.points.length - 1));
};
 
function solve(points, temp_coeff, callback) {
    var path = new Path(points);

    if (points.length < 2) return path.order; 
    if (!temp_coeff)
        temp_coeff = 1 - Math.exp(-10 - Math.min(points.length, 1e6)/1e5);
    var has_callback = typeof(callback) === "function";
  
    for (var temperature = 100 * distance(path.access(0), path.access(1));
             temperature > 1e-6;
             temperature *= temp_coeff) {
        path.change(temperature);
        if (has_callback) callback(path.order);
    }
    return path.order;
};
  
function Point(x, y, m) {
    this.x = x;
    this.y = y;
    this.m = m;
};
  
function distance(p, q) {
    var dx = p.x - q.x, dy = p.y - q.y;
    return Math.sqrt(dx * dx + dy * dy);
}
 
function getRequestObject() {
	if ( window.ActiveXObject) {
        return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
    }
    else if (window.XMLHttpRequest) {
        return (new XMLHttpRequest());
    }
    else {
        return (null);
    }

}

function handleResponse() {
  if (xmlHttp.readyState == 4) {

    if (xmlHttp.status == 200) {
        alert("Dodano");
    }

  }

}

function handleReadRecords() {
  if (xmlHttp.readyState == 4) {
    if (xmlHttp.status == 200) {
	    var div = document.getElementById('dodany');
        html += xmlHttp.responseText;
        div.innerHTML = html;
    }
  }
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleForm() {
    var x0 = parseInt(document.getElementById('x1').value);
	var y0 = parseInt(document.getElementById('y1').value);
    var m0 = document.getElementById('m1').value ;

    var x1 = parseInt(document.getElementById('x2').value);
	var y1 = parseInt(document.getElementById('y2').value);
    var m1 = document.getElementById('m2').value ;

    var x2 = parseInt(document.getElementById('x3').value);
	var y2 = parseInt(document.getElementById('y3').value);
    var m2 = document.getElementById('m3').value ;

    var x3 = parseInt(document.getElementById('x4').value);
	var y3 = parseInt(document.getElementById('y4').value);
    var m3 = document.getElementById('m4').value ;

    var x4 = parseInt(document.getElementById('x5').value);
	var y4 = parseInt(document.getElementById('y5').value);
    var m4 = document.getElementById('m5').value ;

    ctx.strokeStyle = "#656565";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#ddc3a5";
    ctx.font = "bold 12px sans-serif";
    i=1

    const points = [
        new Point(x0, y0, m0),
        new Point(x1, y1, m1),
        new Point(x2, y2, m2),
        new Point(x3, y3, m3),
        new Point(x4, y4, m4),
    ]

    const solution = solve(points)
    const ordered_points = solution.map(i => points[i])

    const Height = 700;
    const Width = 700;

    for(let i = 0; i < 5; i++) { 
        var point = ordered_points[i];

        if(point.x >= Width || point.y >= Height) {
            alert("Koordynata nie moze być większa niz 700")
            return;
        }
    }

    for(let i = 0; i < 5; i++) { 
        for(let j = i + 1; j < 5; j++) { 
            if(ordered_points[i].m === "" || ordered_points[j].m === "") {
                alert("Podaj nazwę miasta, jeśli chcesz zobaczyć ładną animację")
                return;
            }

            if(ordered_points[i].m === ordered_points[j].m) {
                alert("Podane miasta mają taką samą nazwę")
                return;
            }

            if(ordered_points[i].x === "" || ordered_points[j].x === "" || ordered_points[i].y === "" || ordered_points[j].y === "") {
                alert("Podaj koordynaty miast")
                return;
            }

            if(ordered_points[i].x === ordered_points[j].x && ordered_points[i].y === ordered_points[j].y) {
                alert("Podane koordynaty miast mają być unikalne")
                return;
            }

        }
    }

    console.log(ordered_points)
    draw(ordered_points);
}

function calcWaypoints(vertices){
    var waypoints = [];

    for(var i = 1; i < vertices.length; i++){
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;

        for(var j = 0;j < 100; j++){
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({x:x, y:y});
        }
    }
    return(waypoints);
}

var animation_points = [];
var i = 1;
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = "#656565";
ctx.lineWidth = 1;
ctx.fillStyle = "#ddc3a5";
ctx.font = "bold 12px sans-serif";

function animate(){
    if(i < animation_points.length - 1) { 
        requestAnimationFrame(animate); 
    }
    ctx.beginPath();
    ctx.strokeStyle = "#e0a96d";
    ctx.moveTo(animation_points[i - 1].x, animation_points[i - 1].y);
    ctx.lineTo(animation_points[i].x, animation_points[i].y);
    ctx.stroke();
    i++;
}

function draw(ordered_points) {
    ctx.strokeStyle = "#656565";
    
    ctx.beginPath();
    
    for (var x = 0.5; x < 700; x += 10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 700);
    }

    for (var y = 0.5; y < 700; y += 10) {
        ctx.moveTo(0, y);
        ctx.lineTo(700, y);
    }

    ctx.moveTo(0,700);
    ctx.lineTo(700, 700);
    ctx.moveTo(700,0);
    ctx.lineTo(700, 700);

    ctx.stroke();

    ctx.beginPath();

    var point1 = ordered_points[0]
    ctx.fillText(point1.m, parseInt(point1.x) + 10 , parseInt(point1.y) - 5);

    ctx.moveTo(point1.x, point1.y)

    ordered_points.push(ordered_points[0])
    console.log(ordered_points)
    animation_points = calcWaypoints(ordered_points)
    console.log(animation_points)

    for(var i=1; i<5; i++) {
        ctx.moveTo(ordered_points[i].x, ordered_points[i].y)
        ctx.fillText(ordered_points[i].m, parseInt(ordered_points[i].x) + 7 , parseInt(ordered_points[i].y) - 3)
    }

    ctx.stroke()

    animate()
}


function dodawanie_miast() {
    var addSection = document.getElementById('dodany');

    var html = "";
    html += "<fieldset>";
    html += "<p>";
    html += "<label for='tytul'> Nazwa pierwszego miasta </label>";
    html += "<input type='text' name='m1' id='m1'/>";
    html += "</p>";
    html += "<p>";
    html += "<label for='tytul'> Wspolrzędne pierwszego miasta </label>";
    html += "<input type='text' name='x1' id='x1'/>";
    html += "<input type='text' name='y1' id='y1'/>";
    html += "</p>";

    html += "<p>";
    html += "<label for='tytul'> Nazwa drugiego miasta </label>";
    html += "<input type='text' name='m2' id='m2'/>";
    html += "</p>";
    html += "<p>";
    html += "<label for='tytul'> Wspolrzędne drugiego miasta </label>";
    html += "<input type='text' name='x2' id='x2'/>";
    html += "<input type='text' name='y2' id='y2'/>";
    html += "</p>";

    html += "<p>";
    html += "<label for='tytul'> Nazwa trzeciego miasta </label>";
    html += "<input type='text' name='m3' id='m3'/>";
    html += "</p>";
    html += "<p>";
    html += "<label for='tytul'> Wspolrzędne trzeciego miasta </label>";
    html += "<input type='text' name='x3' id='x3'/>";
    html += "<input type='text' name='y3' id='y3'/>";
    html += "</p>";

    html += "<p>";
    html += "<label for='tytul'> Nazwa czwartego miasta </label>";
    html += "<input type='text' name='m4' id='m4'/>";
    html += "</p>";
    html += "<p>";
    html += "<label for='tytul'> Wspolrzędne czwartego miasta </label>";
    html += "<input type='text' name='x4' id='x4'/>";
    html += "<input type='text' name='y4' id='y4'/>";
    html += "</p>";

    html += "<p>";
    html += "<label for='tytul'> Nazwa piątego miasta </label>";
    html += "<input type='text' name='m5' id='m5'/>";
    html += "</p>";
    html += "<p>";
    html += "<label for='tytul'> Wspolrzędne piątego miasta </label>";
    html += "<input type='text' name='x5' id='x5'/>";
    html += "<input type='text' name='y5' id='y5'/>";
    html += "</p>";

    html += "<button type='button' onclick='handleForm()'> Znajdź najkrótszą drogę </button>";
    html += "<button type='button' onclick='reset()'> Zresetuj </button>";
    html += "</fieldset>";

    html += "<fieldset id = 'message'>";
    html += "<p> Znalezienie najkrótszej drogi odbywa się za pomocą algorytmu zazchłannego. Wpisz nazwy miast oraz ich koordynaty od 0 do 699 w odpowiednich polach i zobacz, jakie jest proponowane rozwiązanie. :)";

    html += "</p>";
    html += "</fieldset>";

    addSection.innerHTML = html;
}



