window.addEventListener("DOMContentLoaded", ()=> {
    
    if(checkCookie().length > 0) {
        document.querySelector(".menu-wrapper").innerHTML = 
        `
        <div><button class="btn btn-questionnaire">Ankieta</button></div>
        <div><button class="btn btn-online">Pokaż wyniki</button></div>
        <div><button class="btn btn-logout" onclick="userLogout()">Wyloguj się</button></div>
        `;   
    } else {
        document.querySelector(".menu-wrapper").innerHTML = 
        `
         <div><button class="btn btn-questionnaire">Ankieta</button></div>
         <div><button class="btn btn-offline">Dane offline</button></div>
         <div><button class="btn btn-registration">Rejestracja</button></div>
         <div><button class="btn btn-login">Logowanie</button></div>
        `;
    }
    document.querySelector(".main-content").innerHTML = getQuestionnaire();
});

window.onload = function() {
    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-questionnaire")) {
            document.querySelector(".main-content").innerHTML = getQuestionnaire();  
            console.log("click ankieta");
        }            
    });
    
    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-login")) {
            document.querySelector(".main-content").innerHTML = getLogin();  
            console.log("click login");
        }      
    });

    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-registration")) {
            document.querySelector(".main-content").innerHTML = getRegistration();  
            console.log("click register");
        }      
    });

    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-offline")) {  
            showOffline();
            console.log("click dane offline");
        }      
    });

    document.querySelector(".menu-wrapper").addEventListener("click", (e)=> {
        if(e.target && e.target.classList.contains("btn-online")) {  
            showOnline();
            console.log("click dane online");
        }      
    });
}

let localDbIndex = 0;

function getQuestionnaire() {
    let res = `
    <div class="questionnaire">
    <form class="questionnaire-form" method="POST">
        <div class="questionnaire-wrapper">
            <p>1. Przoszę podać płeć</p>
            <div class="wrapper-item">
                <input type="radio" id="woman" name="gender" value="kobieta">
                <label for="woman">Kobieta</label>
            </div>
            <div class="wrapper-item">
                <input type="radio" id="man" name="gender" value="mezczyzna">
                <label for="man">Mężczyzna</label>
            </div>
            <p>2. Na jakim stanowisku Pan/i pracuje?</p>
            <div class="wrapper-item">
                <input type="radio" id="intern" name="position" value="int">
                <label for="intern">Intern</label>
            </div>
            <div class="wrapper-item">
                <input type="radio" id="junior" name="position" value="jun">
                <label for="junior">Junior</label>
            </div>
            <div class="wrapper-item">
                <input type="radio" id="regular" name="position" value="reg">
                <label for="regular">Regular</label>
            </div>
            <div class="wrapper-item">
                <input type="radio" id="senior" name="position" value="sen">
                <label for="senior">Senior</label>
            </div>
            <p>3. Jakiego jęzuku programowania Pan/Pani używa najczęściej?</p>
            <div class="wrapper-item">
                <input type="radio" id="javaScript" name="language" value="javaScript">
                <label for="javaScript">JavaScript</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="java" name="language" value="java">
                <label for="java">Java</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="cpp" name="language" value="cpp">
                <label for="cpp">C++</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="c" name="language" value="c">
                <label for="c">C</label>
            </div>


            <div class="wrapper-item">
                <input type="radio" id="python" name="language" value="python">
                <label for="python">Python</label>
            </div>
    

            <div class="wrapper-item">
                <input type="radio" id="kotlin" name="language" value="kotlin">
                <label for="kotlin">Kotlin</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="csharp" name="language" value="csharp">
                <label for="csharp">C#</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="swift" name="language" value="swift">
                <label for="swift">Swift</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="objectiveC" name="language" value="objectiveC">
                <label for="objectiveC">Objective-C</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="scala" name="language" value="scala">
                <label for="scala">Scala</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="ruby" name="language" value="ruby">
                <label for="ruby">Ruby</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="php" name="language" value="php">
                <label for="php">PHP</label>
            </div>


            <div class="wrapper-item">
                <input type="radio" id="go" name="language" value="go">
                <label for="go">Go</label>
            </div>

            <div class="wrapper-item">
                <input type="radio" id="typeScript" name="language" value="typeScript">
                <label for="typeScript">TypeScript</label>
            </div>

            <div class="wrapper-item">
            <input type="radio" id="perl" name="language" value="perl">
            <label for="perl">Perl</label>
            </div>
            <div class="wrapper-item">`
            if (checkCookie() == "" || navigator.onLine == false) {
                res+=`<input class="btn btn-send" type='button' value='Wyślij' style="display: block; margin:0 auto;" onclick="sendOffline()">`;
            } else {
                res+=`<input class="btn btn-send" type='button' value='Wyślij' style="display: block; margin:0 auto;" onclick="sendOnline()">`; 
            }
                
            res+=`</div> 
                </div>
                <p class="error"></p>     
            </form> 
        </div> `;
    return res;
}

function getLogin() {
    return `
    <div class="login">
        <p>Logowanie</p>
        <form method="POST">
            <label for="logemail" id="label-que">E-mail</label>
            <input type="text" id="logemail" placeholder="Wpisz e-mail" name="logemail" required>
    
            <label for="logpsw" id="label-que">Hasło</label>
            <input type="password" id="logpsw" placeholder="Podaj hasło" name="logpsw" required>
            <div class="btn-input">
                <input class="btn" type='button' value='Zaloguj' onclick="userLogin()">
            </div>
        </form>
        <p class="error"></p>   
    </div>
    `;
}

function getRegistration() {
    return `
    <div class="login">
        <p>Rejestracja</p>
        <form class="registration-form" method="POST">
            <label for="regemail" id="label-que">E-mail</label>
            <input type="text" id="regemail" placeholder="Wpisz e-mail" name="regemail" required>
    
            <label for="regpsw" id="label-que">Hasło</label>
            <input type="password" id="regpsw" placeholder="Podaj hasło" name="regpsw" required>
            <div class="btn-input">
                <input class="btn" type='button' value='Zarejestruj' onclick="userRegister()">
            </div>
        </form>
        <p class="error"></p>   
    </div>
    `;
}

function getTable() {
    return `
    <div class="table-wrapper" style="width: 600px; margin: 0 auto; margin-top: 20px;">
        <table>
            <thead>
                <tr class="row__main">
                    <th>Lp.</th>
                    <th>Płeć</th>
                    <th>Stanowisko</th>
                    <th>Język programowania</th>
                </tr>
            </thead>
            <tbody>                          
            </tbody>
        </table>
    </div>
    `;
}

function checkCookie() {
    if(document.cookie === undefined) {
        return "";
    }
    if(document.cookie.includes("sessionID") === false) {
        return "";
    }
    let arr = document.cookie.split(";");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("sessionID")) {
            let session = arr[i].split("=");
               if(session[1].length > 0) {
                    return session[1];
                } else {
                    return "";
                }
        }
    }
}

function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}

function validateRadioGroup(arr, pred) {
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].checked) {
            pred = true;
        }    
    }    
    return pred;
}

function uncheckedButtons(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].checked = false;
    }
}

function validateRadioButtons() {
    const genders = document.querySelectorAll("[name = 'gender']"), 
    positions =  document.querySelectorAll("[name = 'position']"),
    languages = document.querySelectorAll("[name = 'language']");


    console.log(genders);

    let gen = false,
        pos = false;
        lan = false;
        

        gen = validateRadioGroup(genders, gen);
        pos = validateRadioGroup(positions, pos);
        lan = validateRadioGroup(languages, lan);
       

    if (gen && pos && lan) {
        document.querySelector("p.error").innerHTML="Dane zostały dodane do bazy";
        return true; 
    } else {
        document.querySelector("p.error").innerHTML="Proszę odpowiedzieć na wszystkie pytania!";
        return false;
    }
}

function getRequestObject()      {
    if ( window.ActiveXObject)  {
       return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
    } else if (window.XMLHttpRequest)  {
       return (new XMLHttpRequest())  ;
    } else {
       return (null) ;
    }
}


function addRow(row) {
    let tmp = `<tr class="row__info">`;
    for (let prop in row ) {
        tmp += "<td>" + row[prop]+" </td>";      
    }
    tmp += "</tr>";
    return tmp;
}

function calcStats(results) {
    results = JSON.parse(results)

    let gender = {
        "kobieta": 0,
        "mezczyzna": 0
    }

    let position = {
        "int": 0,
        "jun": 0,
        "reg": 0,
        "sen": 0
    }

    let language = {
        "javaScript": 0,
        "java": 0,
        "cpp": 0,
        "c": 0,
        "python": 0,
        "kotlin": 0,
        "csharp": 0,
        "swift": 0,
        "objectiveC": 0,
        "scala": 0,
        "ruby": 0,
        "php": 0,
        "go": 0,
        "typeScript": 0,
        "perl": 0
    }

    for(var i=0; i<results.length; i++){
        item = results[i]
        gender[item["gender"]] +=1
        position[item["position"]] +=1
        language[item["language"]] +=1

    }

    drawChart(gender, position, language)
}

function drawChart(gender, position, language) {
    const dataGender= {
        labels: [
          'Kobieta',
          'Mezczyzna',
        ],
        datasets: [{
          label: 'Gender',
          data: [gender["kobieta"], gender["mezczyzna"]],
          backgroundColor: [
            '#d1c0f8',
            '#6818e8',
          ],
          hoverOffset: 4
        }]
    };
    
    const configGender = {
        type: 'doughnut',
        data: dataGender,
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Płeć",
                    color: "white",
                    weight: "bold",
                    font: {
                        size: 20,
                    }
                }
            },    
        }
        
    };

    const dataPosition= {
        labels: [
          'Intern',
          'Junior',
          'Regular',
          'Senior',
        ],
        datasets: [{
          label: 'Pozycja',
          data: [position["int"], position["jun"], position["reg"], position["sen"]],
          backgroundColor: [
            '#d1c0f8',
            '#b08ff6',
            '#8e5cf1',
            '#6818e8',
          ],
          hoverOffset: 4
        }]
    };
    
    const configPosition = {
        type: 'doughnut',
        data: dataPosition,
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Pozycja",
                    color: "white",
                    weight: "bold",
                    font: {
                        size: 20,
                    }
                }
            },    
        }
        
    };

    const dataLanguage = {
        labels: [
          'JavaScript',
          'Java',
          'C++',
          'C',
          'Python',
          'Kotlin',
          'C#',
          'Swift',
          'Objective-C',
          'Scala',
          'Ruby',
          'PHP',
          'Go',
          'TypeScript',
          'Perl',

        ],
        datasets: [{
          label: 'Pozycja',
          data: [language["javaScript"], language["java"], language["cpp"], language["c"], language["python"], language["kotlin"], language["csharp"], language["swift"], language["objectiveC"], language["scala"], language["ruby"], language["php"], language["go"], language["typeScript"], language["perl"]],
          backgroundColor: [
            '#d1c0f8',
            '#cab5f8',
            '#c3abf8',
            '#bca0f7',
            '#b596f7',
            '#ae8bf6',
            '#a680f5',
            '#9f76f4',
            '#986bf3',
            '#905ff1',
            '#8954f0',
            '#8148ee',
            '#793aec',
            '#712cea',
            '#6818e8',
          ],
          hoverOffset: 4
        }]
    };
    
    const configLanguage = {
        type: 'doughnut',
        data: dataLanguage,
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Język programowania",
                    color: "white",
                    weight: "bold",
                    font: {
                        size: 20,
                    }
                }
            },    
        }
    };

      const myChartGender = new Chart(
        document.getElementById('myChartGender'),
        configGender
      );

      const myChartPosition = new Chart(
        document.getElementById('myChartPosition'),
        configPosition
      );

      const myChartLanguage = new Chart(
        document.getElementById('myChartLanguage'),
        configLanguage
      );
}

function showOnline() {
    document.querySelector(".main-content").innerHTML = `
    <div class="chart"> <canvas id="myChartGender"></canvas> </div>
    <div class="chart"> <canvas id="myChartPosition"></canvas> </div>
    <div class="chart"> <canvas id="myChartLanguage"></canvas> </div>
    `

    let req = getRequestObject();
    req.open("GET", "http://localhost:5001/form", true);
    req.setRequestHeader('Content-Type', 'application/json')
    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
            objJSON = JSON.parse(req.response);
            calcStats(objJSON)                         
        }    
    }
    req.send();
}

function showOffline() {
    document.querySelector(".main-content").innerHTML = getTable();

    const connection = window.indexedDB.open("AnkietaJezykiProgramowania", 4);
    connection.onupgradeneeded = function (event) {
        event.target.transaction.abort();
        console.log(event);
    };
    connection.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['results'], "readonly");
        const objectStore = transaction.objectStore('results');
        const objectRequest = objectStore.getAll();
        objectRequest.onerror = function (event) {
            console.log("error");
            console.log(event);
        };
 
        objectRequest.onsuccess = function (event) {
            let rows = "";
            objectRequest.result.forEach(element => {
                rows += addRow(element);
            });
            document.querySelector(".main-content table tbody").innerHTML = rows;
        };
    }
}

function sendOffline() {
    let check = validateRadioButtons();
    if( (check && checkCookie()== "") || (check && navigator.onLine == false)) {
        let queForm = document.querySelector(".questionnaire-form");
        let answer = {};
        answer.id = ++localDbIndex;
        answer.gender = queForm.elements.gender.value;
        answer.position = queForm.elements.position.value;
        answer.language = queForm.elements.language.value;
    
        const connection = window.indexedDB.open("AnkietaJezykiProgramowania", 4);
        connection.onupgradeneeded = function (event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('results', {autoIncrement: true});
            console.log(objectStore);
        };
        connection.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('results', 'readwrite');
            const objectStore = transaction.objectStore('results');
            const objectRequest = objectStore.put(answer);
            objectRequest.onerror = function (event) {
                console.log("error");
                console.log(event);
         };
    
        objectRequest.onsuccess = function (event) {
            console.log("success");
        };
        uncheckedButtons(document.querySelectorAll("[name = 'gender']"));
        uncheckedButtons(document.querySelectorAll("[name = 'position']"));
        uncheckedButtons(document.querySelectorAll("[name = 'language']"));
        document.querySelector("p.error").innerHTML = "Dane zostały dodane do lokalnej bazy danych. Aby zobaczyć wykresy utwórz konto i zaloguj się";
        }
    }
}

function sendOnline() {
    let check = validateRadioButtons();
    if(check && navigator.onLine == true && checkCookie().length > 0) {
        let queForm = document.querySelector(".questionnaire-form");
        let answer = {};
        answer.gender = queForm.elements.gender.value;
        answer.position = queForm.elements.position.value;
        answer.language = queForm.elements.language.value;
    
        let txt = JSON.stringify(answer);
        let req = getRequestObject(); 
        console.log(txt);
        if (navigator.onLine) {
            req.open("POST", "http://localhost:5001/form", true);
            req.setRequestHeader('Content-Type', 'application/json')
            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status == 200) {
                    objJSON = JSON.parse(req.response);
                    if (objJSON['status'] == 'OK') {
                        document.querySelector("p.error").innerHTML = "Dane zostały dodane do bazy"
                        uncheckedButtons(document.querySelectorAll("[name = 'gender']"));
                        uncheckedButtons(document.querySelectorAll("[name = 'position']"));
                        uncheckedButtons(document.querySelectorAll("[name = 'language']"));               
                    } else {
                        document.querySelector("p.error").innerHTML = "Już dodałeś swoje odpowiedzi do bazy"; 
                    }                    
                }    
            }
            req.send(txt);
        } else {
            document.querySelector("p.error").innerHTML = "Jesteś w trybie offline."; 
        }
    }
    if(navigator.onLine == false) {
        document.querySelector("p.error").innerHTML = "Jesteś w trybie offline."; 
    }    
}

function userRegister() {
    console.log("User register");
    const mail = document.querySelector("[name = 'regemail']"), 
          pass =  document.querySelector("[name = 'regpsw']");

    let textError = document.querySelector(".error");
    if (mail.value == "" || pass.value == "") {
        textError.innerHTML = "Pola są puste. Wypełnij je i spróbuj ponownie";
    } else if(validateEmail(mail.value)==false){
        textError.innerHTML = "Sprawdź poprawność email  i spróbuj ponownie";
    } else if(pass.value.length<5) {
        textError.innerHTML = "Hasło musi mieć przynajmniej 5 znaków";
    } else {
        let user = {};
        user.email = mail.value;
        user.pass = pass.value;
        let txt = JSON.stringify(user);
        let req = getRequestObject();
        if(navigator.onLine) {
            req.open("POST", "http://localhost:5001/register", true);
            req.setRequestHeader('Content-Type', 'application/json')
            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status == 200) {
                    console.log(req.responseText);
                    objJSON = JSON.parse(req.response);
                    if (objJSON['status'] == 'OK') {
                        textError.innerHTML = "Konto utworzone. Mozesz zalogować się, wypełnić ankietę i zobaczyć wykresy";
                        document.querySelector(".registration-form").reset();
                    } else {
                        textError.innerHTML = "Użytkownik z takim email już istnieje, podaj inny email"; 
                    }
                } else {
                    textError.innerHTML = "Server error";  
                }
            }
            req.send(txt);
        } else {
            textError.innerHTML = "Jesteś w trybie offline."; 
        }
    }
} 

function sendDB() {
    const connection = window.indexedDB.open("AnkietaJezykiProgramowania", 4);
    connection.onupgradeneeded = function (event) {
        event.target.transaction.abort();
        console.log(event);
    };
    connection.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['results'], "readonly");
        const objectStore = transaction.objectStore('results');
        const objectRequest = objectStore.getAll();
        objectRequest.onerror = function (event) {
            console.log("error");
            console.log(event);
        };

        let req = getRequestObject(); 

        objectRequest.onsuccess = function (event) {
            elems = []
            req.open("POST", "http://localhost:5001/forms", true);
            req.setRequestHeader('Content-Type', 'application/json')
            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status == 200) {
                    objJSON = JSON.parse(req.response);
                    if (objJSON['status'] == 'OK') {
                        document.querySelector("p.error").innerHTML = "Dane offline zostały dodane do bazy"            
                    } else {
                        document.querySelector("p.error").innerHTML = "Nie mozna zsynchronizowac danych offline z baza"; 
                    }                    
                }    
            }
            req.send(JSON.stringify(objectRequest.result));
        };
    }

    // indexedDB.open("")
    indexedDB.deleteDatabase("AnkietaJezykiProgramowania");
    localDbIndex = 0;
}

function userLogin() {
    console.log("User login");
    const mail = document.querySelector("[name = 'logemail']"),
          pass =  document.querySelector("[name = 'logpsw']");
          
    let textError = document.querySelector(".error");

	if (mail.value == "" || pass.value == "") {
        textError.innerHTML = "Pola są puste. Wypełnij je i spróbuj ponownie";
	} else {
        let user = {};
        user.email = mail.value;
        user.pass = pass.value;
        let txt = JSON.stringify(user);
        let req = getRequestObject();
        if(navigator.onLine) {
            req.open("POST", "http://localhost:5001/login", true);
            req.setRequestHeader('Content-Type', 'application/json')
            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status == 200) {
                    console.log(req.responseText);
                    objJSON = JSON.parse(req.response);
                    
                    if (objJSON['status'] == 'OK') {
                        document.cookie = "sessionID=" + objJSON['sessionID'] + "; path=/";
                        textError.innerHTML = "Jesteś zalogowany. Mozesz wypełnić ankietę i zobaczyć wykresy";
                        document.querySelector(".menu-wrapper").innerHTML = 
                        `
                        <div><button class="btn btn-questionnaire">Ankieta</button></div>
                        <div><button class="btn btn-online">Pokaż wyniki</button></div>
                        <div><button class="btn btn-logout" onclick="userLogout()">Wyloguj się</button></div>
                        `;
                        document.querySelector(".main-content").innerHTML = getQuestionnaire();
                        setTimeout(()=> {
                            textError.style.display = "none";
                        }, 3000);
                        
                        sendDB()

                    }
                    else
                    textError.innerHTML = "Podałeś zły login lub hasło, sprawdź swoje dane i sprobuj ponownie!";
                    } else {
                        textError.innerHTML = "Server error";  
                    }
				if(req.readyState == 4 && req.status == 401) {
						textError.innerHTML = "Podałeś zły login lub hasło, sprawdź swoje dane i sprobuj ponownie!";
				}
                    
            }
            req.send(txt);
        } else {
            textError.innerHTML = "Jesteś w trybie offline."; 
        }
    }
}

function userLogout() {
    document.cookie = "sessionID=" + "" + "; path=/";
    document.querySelector(".menu-wrapper").innerHTML = 
    `
    <div><button class="btn btn-questionnaire">Ankieta</button></div>
    <div><button class="btn btn-offline">Dane offline</button></div>
    <div><button class="btn btn-registration">Rejestracja</button></div>
    <div><button class="btn btn-login">Logowanie</button></div>
    `; 
    document.querySelector(".main-content").innerHTML = getQuestionnaire(); 
}

const getResource = async (url) => { 
    const res = await fetch(url);

    if (!res.ok) {
        throw prompt(new Error(`Could not fetch ${url}, status: ${res.status}`));
    }

    return await res.json(); 
};

