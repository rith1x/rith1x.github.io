document.addEventListener('DOMContentLoaded', async function () {

    const observer = new IntersectionObserver(async (entries) => {

        for (const entry of entries) {
            entry.target.classList.remove('hide', entry.isIntersecting);
            await delay(30);
            entry.target.classList.add('show', entry.isIntersecting);
        }
    });

    document.querySelectorAll('[fade]').forEach((el) => observer.observe(el));
});
document.addEventListener("mousemove", async (e) => {
    await delay(50)
    document.getElementById('blob').style.visibility = "visible"
    document.getElementById('blob').style.left = e.x + "px"
    document.getElementById('blob').style.top = e.y + "px"
})
async function delay(ms) {
    return new Promise(resolve => { setTimeout(resolve, ms) })
}


async function phraseCreate() {
    const pEl = document.getElementById('introduce')
    let phrase = "I'm Kiruthik Kumar, crafting intuitive digital experiences from concept to code. I provide professional web design services, creating visually appealing,responsive websites that prioritize user experience. From layout and graphics to interactivity, I ensure seamless navigation and a stunning online presence across all devices."
    let phrases = phrase.split("")

    for (let i = 0; i < phrases.length; i++) {
        let word = phrases[i]

        const wel = document.createElement('span')
        wel.setAttribute("glow", true)
        wel.innerText = word + ""
        wel.className = "glow-hide"
        pEl.appendChild(wel)
    }
}


document.addEventListener('DOMContentLoaded', async function () {
    await phraseCreate()
    const observer = new IntersectionObserver(async (entries) => {

        for (const entry of entries) {
            // entry.target.classList.remove('glow-hide', entry.isIntersecting);
            // await delay(20);

            // entry.target.classList.add('glow-show', entry.isIntersecting);
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    await delay(20); // Delay between glowing each character
                    spans[i].classList.remove('glow-hide');
                    spans[i].classList.add('shads');
                    setTimeout(() => {
                        spans[i].classList.remove('shads');
                    }, 200)
                    spans[i].classList.add('glow-show');
                }
            }
        }
    });

    const introduceEl = document.getElementById('introduce');
    observer.observe(introduceEl); // Observe the main element
    // document.querySelectorAll('[glow]').forEach((el) => observer.observe(el));
});



const designWorks = [
    {
        "title": "Analog Clock Design",
        "url": "https://rith1x.github.io/clock",
        "short_desc": "A traditional analog clock design built with HTML, CSS, and JavaScript.",
        "desc": "This project showcases a traditional analog clock design using HTML, CSS, and JavaScript. The clock has smooth ticking hands that display real-time hours, minutes, and seconds, offering a visually appealing way to view the current time. Perfect for learning basic DOM manipulation and CSS animations.",
        "category": "Design"
    },
    {
        "title": "Digital Clock Design",
        "url": "https://rith1x.github.io/digi",
        "short_desc": "A simple digital clock design with real-time updates.",
        "desc": "A clean and modern digital clock that displays the current time in hours, minutes, and seconds. Built with HTML, CSS, and JavaScript, this clock automatically updates in real-time. It provides a minimalistic approach to time display, perfect for learning JavaScript date and time functions.",
        "category": "Design"
    },
    {
        "title": "Analog Clock Modern Design",
        "url": "https://rith1x.github.io/clockx",
        "short_desc": "A modern take on the analog clock design with smooth transitions.",
        "desc": "This modern analog clock features smooth hand transitions and a clean interface. Built using HTML, CSS, and JavaScript, it offers a more contemporary look while maintaining the classic analog clock feel. Ideal for those wanting to explore modern design aesthetics in web development.",
        "category": "Design"
    },
    {
        "title": "Realistic Marksheet Recreation",
        "url": "https://rith1x.github.io/designs/ms",
        "short_desc": "A realistic recreation of a marksheet design for academic purposes.",
        "desc": "This project is a detailed recreation of a marksheet, designed to closely resemble the real-world documents used in academic institutions. It showcases the use of CSS for layout precision, making it ideal for those interested in replicating real-life designs in web formats.",
        "category": "Design"
    },
    {
        "title": "Playing Cards Realistic",
        "url": "https://rith1x.github.io/designs/card",
        "short_desc": "Realistic playing cards design with intricate details.",
        "desc": "A web-based recreation of a deck of playing cards, featuring realistic designs and intricate details. This project utilizes HTML and CSS to accurately depict card visuals, making it perfect for those interested in graphic design and visual aesthetics in web development.",
        "category": "Design"
    },
    {
        "title": "Simple Signup Form Design",
        "url": "https://rith1x.github.io/form",
        "short_desc": "A minimalistic signup form with user-friendly UI.",
        "desc": "A clean and user-friendly signup form that allows users to input information such as name, email, and password. Designed with HTML and CSS, the form is fully responsive and showcases best practices in form design for modern websites.",
        "category": "Design"
    },
    {
        "title": "Simple OS UI",
        "url": "https://rith1x.github.io/os",
        "short_desc": "A basic operating system interface designed with web technologies.",
        "desc": "This project mimics the look and feel of an operating system UI using HTML, CSS, and JavaScript. It includes a start menu, taskbar, and window elements, providing a basic yet functional web-based operating system interface design. Ideal for exploring UI design principles.",
        "category": "Design"
    },
    {
        "title": "Simple Solar System Design",
        "url": "https://rith1x.github.io/solarsystem",
        "short_desc": "A simple solar system design with CSS animations.",
        "desc": "A visually engaging solar system representation using HTML and CSS. The planets orbit smoothly around the sun with the help of CSS animations, providing a fun and interactive way to display the solar system on a web page. Great for learning CSS keyframes and animations.",
        "category": "Design"
    },
    {
        "title": "Responsive API-Based Weather",
        "url": "https://rith1x.github.io/weather",
        "short_desc": "A responsive weather app fetching real-time data using APIs.",
        "desc": "This project is a responsive weather application that pulls real-time weather data from an external API. The design is clean and user-friendly, with weather information displayed in a modern layout. A great project for learning API integration and responsive design techniques.",
        "category": "Design"
    }
]
const arr = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>`
const projectEl = document.getElementById('proj')
function appendDesigns() {
    let bgclr = randomBG()
    const titleD = document.createElement('div')
    titleD.className = 'projBar'
    titleD.style.backgroundColor = bgclr
    titleD.style.color = textClr(bgclr)
    titleD.innerHTML = "<h1>Front-end Design Projects</h1>"
    projectEl.append(titleD)

    for (let i = 0; i < designWorks.length; i++) {
        bgclr = randomBG()
        // let bgClr2 = randomBG()
        const projectB = document.createElement('div')
        const projectI = document.createElement('img')
        const projectT = document.createElement('h1')
        const projectD = document.createElement('button')
        const projectC = document.createElement('p')
        projectD.innerHTML = arr
        projectC.innerText = designWorks[i].category
        projectT.innerText = designWorks[i].title
        projectI.src = `./i/d${i}.png`
        const projectA = document.createElement('a')
        projectA.href = designWorks[i].url
        projectB.className = "project-box"
        projectA.style.background = bgclr
        // projectA.style.backgroundImage = `linear-gradient(-45deg, ${bgclr},${bgClr2})`
        projectT.style.color = textClr(bgclr)
        projectC.style.color = textClr(bgclr)
        projectB.appendChild(projectT)
        projectB.appendChild(projectD)
        projectB.appendChild(projectC)
        projectB.appendChild(projectI)
        projectA.appendChild(projectB)
        projectA.setAttribute('fade', true)
        projectEl.appendChild(projectA)
    }
}

appendDesigns()
function randomBG() {
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
    const hexCode = "#" + r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');

    return hexCode;
}

const testimonials = [
    {
        "source": "Dev.to Moderator",
        "quote": "Congrats to @rith1x for building a beautiful, responsive website in the Glam Up My Markup prompt! This submission exudes personality and professionalism and creates a delightful and accessible user experience. It makes us want to visit one of these beaches!"
    },
    {
        "source": "Dev.to Moderator",
        "quote": "@rith1x takes the win with a beautiful, custom landing page. The New York Cricket League would be stoked to have this as their site, if they existed. 😉"
    },
    {
        "source": "Dev.to Community Member",
        "quote": "The attention to detail is amazing 🤩 Awesome work."
    },
    {
        "source": "Dev.to Community Member",
        "quote": "AMAZED BY THE EFFORT PUT INTO THIS. DEFINITELY ONE OF THE WINNERS! Great work."
    },
    {
        "source": "Dev.to Community Member",
        "quote": "Looks pretty ✨."
    },
    {
        "source": "Dev.to Community Member",
        "quote": "Nice work! 😊 Congratulations on winning the Glam Up My Markup Beaches June Challenge! 🎉 Keep up the amazing work! 👏"
    }
]

function testimonialDOM() {
    const testEl = document.getElementById('testimonial')
    for (let i = 0; i < testimonials.length; i++) {
        var clr8 = randomBG()
        const bubble = document.createElement('div')
        const author = document.createElement('h4')
        const comment = document.createElement('p')
        bubble.style.background = clr8 + "aa"
        author.innerText = testimonials[i].source
        author.style.color = textClr(clr8)
        comment.innerText = testimonials[i].quote
        bubble.append(author, comment)
        bubble.setAttribute('fade', true)
        testEl.appendChild(bubble)
    }
} testimonialDOM()

function textClr(lightHex) {
    const hex = lightHex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const darkR = Math.max(0, r - 160);
    const darkG = Math.max(0, g - 160);
    const darkB = Math.max(0, b - 160);
    const darkHex = "#" + darkR.toString(16).padStart(2, '0') +
        darkG.toString(16).padStart(2, '0') +
        darkB.toString(16).padStart(2, '0');

    return darkHex;
}


const games = [
    {
        "title": "Space Invaders",
        "url": "https://rith1x.github.io/space",
        "short_desc": "--",
        "desc": "-",
        "category": "Games"
    },
    {
        "title": "2048",
        "url": "https://rith1x.github.io/2048",
        "short_desc": "A browser version of the popular 2048 game. Combine tiles to reach the number 2048.",
        "desc": "Play the popular number puzzle game directly in your browser. Slide the tiles using arrow keys and try to combine numbers to reach 2048. The game keeps track of your high score and progress as you continue merging tiles.",
        "category": "Games"
    },
    {
        "title": "Handcricket",
        "url": "https://rith1x.github.io/cricket",
        "short_desc": "Play hand cricket against the computer using random number selections.",
        "desc": "A digital version of hand cricket where players pick numbers to simulate cricket shots and defenses. Compete against the computer in a simple game where randomness plays a huge part. Make your selections, score runs, and defeat the AI opponent.",
        "category": "Games"
    },
    {
        "title": "Minesweeper",
        "url": "https://rith1x.github.io/mines",
        "short_desc": "Classic Minesweeper game recreated for the web.",
        "desc": "A web-based version of the classic Minesweeper game. Click on tiles to reveal numbers or mines. The goal is to clear the field without detonating a mine. Includes various difficulty levels to challenge your skills.",
        "category": "Games"
    },
    {
        "title": "Math.random() Game",
        "url": "https://rith1x.github.io/random",
        "short_desc": "A fun number guessing game using Math.random() in JavaScript.",
        "desc": "Test your luck in this number guessing game. The computer generates a random number, and you have to guess it within a set range. The game provides feedback on whether your guess is too high or too low, making it an entertaining way to pass the time.",
        "category": "Games"
    },
    {
        "title": "Stone Paper Scissors",
        "url": "https://rith1x.github.io/rps",
        "short_desc": "Classic rock-paper-scissors game against the computer.",
        "desc": "Play the classic rock-paper-scissors game against an AI opponent. Choose your move and see if you can outsmart the computer. The game provides an enjoyable experience with quick rounds and instant results.",
        "category": "Games"
    },
    {
        "title": "API-based Mini Trivia",
        "url": "https://rith1x.github.io/trivia",
        "short_desc": "A trivia game using an external API for random questions.",
        "desc": "Challenge yourself with this trivia game that fetches random questions from an external API. Test your knowledge across different categories and see how many questions you can answer correctly. The game offers an interactive way to learn new facts.",
        "category": "Games"
    },
    {
        "title": "Tic Tac Toe",
        "url": "https://rith1x.github.io/ttt",
        "short_desc": "Classic tic-tac-toe game for two players or against the computer.",
        "desc": "Enjoy a game of tic-tac-toe, either against the computer or with a friend. The game provides a simple, user-friendly interface and keeps track of wins, losses, and ties. It's a great way to pass the time and enjoy some strategic fun.",
        "category": "Games"
    },
    {
        "title": "Whack-a-Mole",
        "url": "https://rith1x.github.io/whackamole",
        "short_desc": "Interactive Whack-a-Mole game with score tracking.",
        "desc": "Test your reflexes in this web-based Whack-a-Mole game. Moles pop up randomly, and your task is to click on them as quickly as possible. The game tracks your score, challenging you to improve your reaction time with each round.",
        "category": "Games"
    }
]


function projectGames() {
    let clr9 = randomBG()

    const titleG = document.createElement('div')
    titleG.className = 'projBar'
    titleG.innerText = "Games!"
    titleG.style.background = clr9
    titleG.style.color = textClr(clr9)
    projectEl.append(titleG)
    for (let i = 0; i < games.length; i++) {
        clr9 = randomBG()
        const gamesB = document.createElement('div')
        const gamesI = document.createElement('img')
        const gamesT = document.createElement('h1')
        const gamesD = document.createElement('button')
        console.log(gamesI)
        const gamesC = document.createElement('p')
        gamesB.className = "gameBox"
        gamesC.innerText = games[i].category
        gamesD.innerHTML = arr
        gamesB.classList.add('show')
        gamesT.innerText = games[i].title
        gamesI.src = `../i/g${i}.png`
        gamesI.alt = `../i/g${i}.png`
        const gamesA = document.createElement('a')
        gamesA.href = games[i].url
        gamesA.style.backgroundColor = clr9
        gamesT.style.color = textClr(clr9)
        gamesC.style.color = textClr(clr9)
        gamesB.append(gamesI)
        gamesB.append(gamesT)
        gamesB.append(gamesC)
        gamesB.append(gamesD)
        gamesA.append(gamesB)
        projectEl.appendChild(gamesA)
    }
}

projectGames()

const navy = document.querySelectorAll('.link a');
console.log(navy)
navy.forEach(a => {
    a.addEventListener('click', navOps)
})
function navOps(e) {
    navy.forEach(l => {
        l.parentElement.classList.remove('active')
    })
    document.getElementById(e.target.id).parentElement.classList.add("active")
}

const utilProj = [
    {
        "title": "BMI Calculator",
        "url": "https://rith1x.github.io/bmi",
        "short_desc": "Calculate your Body Mass Index (BMI) based on height and weight.",
        "desc": "A simple tool to calculate your Body Mass Index (BMI). Enter your height and weight, and the calculator will provide your BMI along with an indication of whether you're underweight, normal weight, overweight, or obese. Ideal for health tracking.",
        "category": "Utility Tools"
    },
    {
        "title": "Calculator",
        "url": "https://rith1x.github.io/calculator",
        "short_desc": "A basic web-based calculator for simple arithmetic operations.",
        "desc": "Perform basic arithmetic operations such as addition, subtraction, multiplication, and division using this simple online calculator. The intuitive interface allows for quick and easy calculations, making it useful for day-to-day needs.",
        "category": "Utility Tools"
    },
    {
        "title": "CGPA Calculator",
        "url": "https://rith1x.github.io/cgpa",
        "short_desc": "Calculate your CGPA based on your semester grades.",
        "desc": "Easily calculate your Cumulative Grade Point Average (CGPA) by entering your semester grades. This tool helps students quickly determine their overall academic performance without the need for manual calculations. Simple and efficient.",
        "category": "Utility Tools"
    },
    {
        "title": "Character Counter, WPM, Word Frequency",
        "url": "https://rith1x.github.io/chars",
        "short_desc": "Count characters, words, and calculate word frequency and WPM.",
        "desc": "Analyze text with this tool that counts characters and words, calculates your Words Per Minute (WPM) typing speed, and shows word frequency. Perfect for writers, typists, and anyone looking to evaluate their text input.",
        "category": "Utility Tools"
    },
    {
        "title": "End-to-End Encrypted Chat Webapp",
        "url": "https://rith1x.github.io/chat",
        "short_desc": "A secure chat webapp with end-to-end encryption.",
        "desc": "A web-based chat application with end-to-end encryption to ensure privacy. Users can chat securely without worrying about their data being intercepted. Ideal for those looking for a simple, encrypted communication platform.",
        "category": "Utility Tools"
    },
    {
        "title": "Clicker Counter",
        "url": "https://rith1x.github.io/clicker",
        "short_desc": "A simple web-based clicker counter.",
        "desc": "Keep track of your counts with this easy-to-use clicker counter. Whether it's for counting events, tracking items, or any other purpose, this tool provides a simple interface for accurate counting.",
        "category": "Utility Tools"
    },
    {
        "title": "Unit Converter",
        "url": "https://rith1x.github.io/converter",
        "short_desc": "Convert units across different measurement systems.",
        "desc": "Easily convert units of measurement such as length, weight, temperature, and more with this unit converter. It supports a wide range of units and provides quick results, making it a handy tool for students, professionals, and travelers.",
        "category": "Utility Tools"
    },
    {
        "title": "Persistent Grocery List",
        "url": "https://rith1x.github.io/grocery",
        "short_desc": "Create a persistent grocery list that saves across sessions.",
        "desc": "This tool allows users to create a grocery list that persists even after closing the browser. Add items, check them off, and manage your shopping efficiently. Perfect for anyone who needs to organize their shopping in a simple way.",
        "category": "Utility Tools"
    },
    {
        "title": "Persistent To-Do List",
        "url": "https://rith1x.github.io/todo",
        "short_desc": "A persistent to-do list that saves your tasks across sessions.",
        "desc": "Stay organized with this persistent to-do list that saves your tasks even after you close the browser. Add, delete, and manage your tasks easily, making it a perfect tool for personal task management and productivity.",
        "category": "Utility Tools"
    },
    {
        "title": "Simple HTML CSS Live IDE",
        "url": "https://rith1x.github.io/ide",
        "short_desc": "A basic live IDE for HTML and CSS coding.",
        "desc": "A simple, live web-based Integrated Development Environment (IDE) for coding in HTML and CSS. It allows you to see the results of your code instantly, making it a great tool for beginners or anyone who wants to quickly test their code.",
        "category": "Utility Tools"
    },
    {
        "title": "Simple Persistent Notes",
        "url": "https://rith1x.github.io/keep",
        "short_desc": "A simple note-taking app with persistent storage.",
        "desc": "Take notes and save them across sessions with this simple note-taking app. It offers a clean interface for creating, editing, and deleting notes that are stored locally in your browser, ensuring your data stays with you.",
        "category": "Utility Tools"
    },
    {
        "title": "Bin-Decimal Converter",
        "url": "https://rith1x.github.io/num",
        "short_desc": "Convert numbers between binary and decimal formats.",
        "desc": "A tool to convert numbers between binary and decimal formats. Ideal for students and professionals dealing with digital systems and computer science-related tasks, providing a quick and accurate conversion between the two number systems.",
        "category": "Utility Tools"
    },
    {
        "title": "Password Generator",
        "url": "https://rith1x.github.io/password",
        "short_desc": "Generate strong, random passwords.",
        "desc": "Create secure and strong passwords with this password generator. Users can select the length and complexity, making it ideal for generating passwords for various accounts or services, ensuring online safety.",
        "category": "Utility Tools"
    },
    {
        "title": "Pomodoro Timer",
        "url": "https://rith1x.github.io/pomodoro",
        "short_desc": "A timer based on the Pomodoro Technique for productivity.",
        "desc": "Boost your productivity with this Pomodoro timer. The Pomodoro Technique is a time management method that uses short intervals of work followed by breaks. This tool helps users follow that cycle and improve their focus on tasks.",
        "category": "Utility Tools"
    },
    {
        "title": "Text to QR",
        "url": "https://rith1x.github.io/qr",
        "short_desc": "Convert any text into a scannable QR code.",
        "desc": "This tool allows users to convert any text into a QR code that can be scanned with a mobile device. It's useful for quickly sharing links, contact information, or any other text-based data in a compact format.",
        "category": "Utility Tools"
    },
    {
        "title": "Shareable Random Quotes Generator",
        "url": "https://rith1x.github.io/quotes",
        "short_desc": "Generate random, shareable quotes with a simple click.",
        "desc": "Get inspired with random quotes from various authors and topics. The tool allows users to generate and share motivational or thought-provoking quotes with just one click. Perfect for sharing on social media or with friends.",
        "category": "Utility Tools"
    },
    {
        "title": "Temperature Unit Converter",
        "url": "https://rith1x.github.io/temperature",
        "short_desc": "Convert between Celsius, Fahrenheit, and Kelvin units.",
        "desc": "Quickly convert temperatures between Celsius, Fahrenheit, and Kelvin units. This tool provides a simple interface for converting temperature values, making it perfect for students, scientists, or anyone working with different temperature scales.",
        "category": "Utility Tools"
    },
    {
        "title": "Creative Thoughts Editor & Export as Image",
        "url": "https://rith1x.github.io/thoughts",
        "short_desc": "Write creative thoughts and export them as an image.",
        "desc": "This tool allows users to write their creative thoughts, quotes, or ideas and export them as an image. Perfect for sharing on social media or keeping as a personal reminder, it helps you turn words into visually appealing images.",
        "category": "Utility Tools"
    },
    {
        "title": "Simple Static eCommerce",
        "url": "https://rith1x.github.io/ecommerce",
        "short_desc": "A basic eCommerce website with static content and shopping cart.",
        "desc": "A simple static eCommerce website that provides users with a straightforward shopping experience. It includes a shopping cart and product listings, making it ideal for showcasing products in a basic format without dynamic server-side content.",
        "category": "Utility Tools"
    }
];



(async function projj() {
    for (let i = 0; i < utilProj.length; i++) {
        console
    }
})();
