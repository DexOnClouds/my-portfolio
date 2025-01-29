document.addEventListener('DOMContentLoaded', () => {
    const consoleContent = document.querySelector('.console-content');
    const bgMusic = document.getElementById('bgMusic');
    let commandHistory = [];
    let historyIndex = -1;
    let currentInput = '';
    let currentLine = null;
    let isMusicPlaying = false;

    // Preload and start music
    bgMusic.load();

    // Force autoplay
    function tryPlayMusic() {
        bgMusic.play()
            .then(() => {
                isMusicPlaying = true;
            })
            .catch(() => {
                // If failed, try again after a short delay
                setTimeout(tryPlayMusic, 1000);
            });
    }

    // Start trying to play immediately
    tryPlayMusic();

    // Also try on any user interaction
    ['click', 'keydown', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, () => {
            if (!isMusicPlaying) {
                tryPlayMusic();
            }
        }, { once: true });
    });

    const asciiArt = {
        heart: `
    ♥♥♥   ♥♥♥
  ♥♥♥♥♥ ♥♥♥♥♥
 ♥♥♥♥♥♥♥♥♥♥♥
 ♥♥♥♥♥♥♥♥♥♥♥
  ♥♥♥♥♥♥♥♥♥
    ♥♥♥♥♥
      ♥`,
        coffee: `
   )  )
  (  (
    ) )
 ________
|        |]
|        |
|________|\n`,
        cat: `
 /\\___/\\
(  o o  )
(  =^=  )
 (____)\n`
    };

    const funnyResponses = [
        "I'm not a robot, I'm just really good at pretending!",
        "I'd tell you a joke about programming, but I'm afraid it wouldn't compile.",
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "404: Humor not found. Please try again!",
        "I'm so good at programming, I can write 'Hello World' in my sleep!"
    ];

    const commands = {
        help: () => `Available commands:
  help     - Show this help message
  clear    - Clear the console
  about    - About me
  projects - List my projects
  contact  - Contact information
  skills   - List my skills
  play     - Play background music
  pause    - Pause background music
  
Fun Commands:
  coffee   - Need a coffee break?
  heart    - Show some love
  cat      - Meow!
  joke     - Random programming joke
  matrix   - Enter the matrix
  rainbow  - Rainbow text effect`,

        clear: () => {
            while (consoleContent.firstChild && consoleContent.children.length > 1) {
                consoleContent.removeChild(consoleContent.firstChild);
            }
            return '';
        },

        music: () => `Music Controls:
  play  - Play background music
  pause - Pause background music
Currently: ${isMusicPlaying ? 'Playing' : 'Paused'}`,

        play: () => {
            tryPlayMusic();
            return 'Music started playing';
        },

        pause: () => {
            bgMusic.pause();
            isMusicPlaying = false;
            return 'Music paused';
        },

        about: () => {
            const aboutText = `Hello there! . Happy too see u here and also ur burning enthusiasm to know about me

I'm Dex, born and raised in India. As a child, I had a passionate dream to become a writer and fabricate a fantasy world , but that aspiration faded over time amidst life's chaos.

Presently, I'm deeply passionate about coding, reading, watching movies, and animating. life's always been great and I'm truly grateful for life's blessings, which include my wonderful parents, friends, and my lovely girlfriend.`;
            
            const output = document.createElement('div');
            output.className = 'console-output';
            output.style.color = '#FFA500'; // Orange color
            output.textContent = aboutText;
            consoleContent.insertBefore(output, currentLine);
            return '';
        },
        
        projects: () => {
            const output = document.createElement('div');
            output.className = 'console-output';
            output.innerHTML = `These are the projects I have worked on:<br>
<a href="https://focusbetter.top/" target="_blank" style="color: #27c93f; text-decoration: underline;" onclick="this.blur();">https://focusbetter.top/</a> <br>
<a href="https://github.com/DexOnClouds/yourquizbuddy" target="_blank" style="color: #27c93f; text-decoration: underline;" onclick="this.blur();">https://github.com/DexOnClouds/yourquizbuddy</a> <br>
<a href="https://aurora-dash.vercel.app/" target="_blank" style="color: #27c93f; text-decoration: underline;" onclick="this.blur();">Aurora - Discord Bot </a>`; 

            consoleContent.insertBefore(output, currentLine);
            
            // Remove focus from any links
            setTimeout(() => {
                const links = document.querySelectorAll('a');
                links.forEach(link => link.blur());
            }, 100);
            
            return '';
        },
        
        contact: () => `You can find my discord link above in the social icons.`,
        
        skills: () => `My Skills:
• Coding
• Animation
• Video Editing
• Fiction Writing`,

        coffee: () => asciiArt.coffee,
        heart: () => asciiArt.heart,
        cat: () => asciiArt.cat,

        joke: () => funnyResponses[Math.floor(Math.random() * funnyResponses.length)],

        matrix: () => {
            const output = document.createElement('div');
            output.className = 'console-output';
            output.textContent = 'Initializing the Matrix...';
            consoleContent.insertBefore(output, currentLine);

            runMatrixAnimation(output);
            return '';
        },

        rainbow: () => {
            const text = 'Welcome to my portfolio!';
            const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8f00ff'];
            let coloredText = '';

            [...text].forEach((char, i) => {
                const color = colors[i % colors.length];
                coloredText += `<span style="color: ${color}">${char}</span>`;
            });

            const output = document.createElement('div');
            output.className = 'console-output';
            output.innerHTML = coloredText;
            consoleContent.insertBefore(output, currentLine);
            return '';
        }
    };

    // Matrix animation function
    function runMatrixAnimation(outputDiv) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        let iterations = 0;
        outputDiv.style.color = '#ff0000'; // Changed to red

        return new Promise((resolve) => {
            const matrixInterval = setInterval(() => {
                let matrixLine = '';
                for(let i = 0; i < 40; i++) {
                    matrixLine += chars[Math.floor(Math.random() * chars.length)] + ' ';
                }
                outputDiv.textContent = matrixLine;

                iterations++;
                if(iterations > 60) { // Increased iterations for longer duration (6 seconds)
                    clearInterval(matrixInterval);
                    outputDiv.textContent = 'Matrix initialized. Welcome to real world.';
                    resolve();
                }
            }, 100);
        });
    }

    function createNewLine() {
        const line = document.createElement('div');
        line.className = 'console-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'console-prompt';
        prompt.textContent = '>';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'console-input';
        input.autocomplete = 'off';
        input.spellcheck = false;
        
        line.appendChild(prompt);
        line.appendChild(input);
        
        return line;
    }

    function updateLine() {
        const input = currentLine.querySelector('input');
        currentInput = input.value;
    }

    function executeCommand(cmd) {
        const command = cmd.toLowerCase().trim();
        if (command === '') return;

        commandHistory.push(command);
        historyIndex = commandHistory.length;

        const output = commands[command] 
            ? commands[command]() 
            : `Command not found: ${command}. Type 'help' for available commands.`;

        if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'console-output';
            outputDiv.textContent = output;
            consoleContent.insertBefore(outputDiv, currentLine);
        }

        currentInput = '';
        updateLine();
        consoleContent.scrollTop = consoleContent.scrollHeight;
    }

    // Initialize console
    function initConsole() {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'console-output welcome-message';

        // First show matrix animation
        welcomeMsg.textContent = 'console.init("dexon")';
        consoleContent.appendChild(welcomeMsg);

        runMatrixAnimation(welcomeMsg).then(() => {
            // After matrix animation, show the welcome message
            setTimeout(() => {
                welcomeMsg.innerHTML = `console.log("Welcome to interactive terminal!")
Type <span style="color: #27c93f">help</span> to discover available commands.`;
                welcomeMsg.style.color = '#e0e0e0'; // Reset color
            }, 1000);
        });

        currentLine = createNewLine();
        consoleContent.appendChild(currentLine);
    }

    initConsole();

    // Add "have a nice day" message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'console-output';
    welcomeMessage.style.color = '#27c93f';
    welcomeMessage.textContent = 'Have a nice day! Type "help" for available commands.';
    consoleContent.insertBefore(welcomeMessage, currentLine);

    // Event listeners
    document.addEventListener('keydown', (e) => {
        const input = currentLine.querySelector('input');
        
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                executeCommand(command);
                input.value = '';
                currentInput = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
                currentInput = input.value;
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
                currentInput = input.value;
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
                currentInput = '';
            }
        }
    });
});
