// Quiz Data
const quizData = [
    {
        question: "Which CSS property is used to create responsive layouts that adapt to different screen sizes?",
        options: [
            "display: flex;",
            "media queries",
            "position: relative;",
            "font-size: responsive;"
        ],
        correct: 1,
        explanation: "Media queries allow you to apply different CSS styles based on device characteristics like screen width."
    },
    {
        question: "What does API stand for in web development?",
        options: [
            "Automated Programming Interface",
            "Application Programming Interface",
            "Advanced Programming Interaction",
            "Application Protocol Integration"
        ],
        correct: 1,
        explanation: "API stands for Application Programming Interface, which allows different software applications to communicate with each other."
    },
    {
        question: "Which JavaScript method is used to make HTTP requests to APIs?",
        options: [
            "document.query()",
            "http.request()",
            "fetch()",
            "ajax.call()"
        ],
        correct: 2,
        explanation: "The fetch() method is the modern JavaScript approach for making HTTP requests to APIs and handling responses."
    },
    {
        question: "What is the purpose of the 'viewport' meta tag in HTML?",
        options: [
            "To set the background color of a webpage",
            "To control the layout on mobile browsers",
            "To add a description for search engines",
            "To link to external CSS files"
        ],
        correct: 1,
        explanation: "The viewport meta tag controls the page's dimensions and scaling to ensure proper rendering on mobile devices."
    },
    {
        question: "Which CSS feature allows smooth transitions between property values?",
        options: [
            "transform",
            "animation",
            "transition",
            "keyframes"
        ],
        correct: 2,
        explanation: "The CSS transition property allows you to smoothly animate changes to CSS properties over a specified duration."
    },
    {
        question: "What is the correct way to create a responsive image that scales with its container?",
        options: [
            "img { width: 100%; height: auto; }",
            "img { size: responsive; }",
            "img { scale: container; }",
            "img { max-size: 100%; }"
        ],
        correct: 0,
        explanation: "Setting width: 100% and height: auto ensures the image scales proportionally to fit its container width."
    },
    {
        question: "Which JavaScript concept is demonstrated by the fetch() API returning a Promise?",
        options: [
            "Synchronous execution",
            "Asynchronous programming",
            "Object-oriented programming",
            "Functional programming"
        ],
        correct: 1,
        explanation: "Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value."
    },
    {
        question: "What is the purpose of the 'alt' attribute in an image tag?",
        options: [
            "To add a tooltip on hover",
            "To provide alternative text for accessibility",
            "To specify image dimensions",
            "To create a fallback image source"
        ],
        correct: 1,
        explanation: "The alt attribute provides alternative text for screen readers and when images cannot be displayed."
    },
    // {
    //     question: "Which HTML5 element is most appropriate for marking up a self-contained composition?",
    //     options: [
    //         "<div>",
    //         "<section>",
    //         "<article>",
    //         "<content>"
    //     ],
    //     correct: 2,
    //     explanation: "The <article> element represents a self-contained composition that is independently distributable or reusable."
    // },
    {
        question: "What does CORS stand for in web security?",
        options: [
            "Cross-Origin Resource Sharing",
            "Centralized Origin Request System",
            "Certified Origin Security",
            "Cross-Platform Origin Services"
        ],
        correct: 0,
        explanation: "CORS (Cross-Origin Resource Sharing) is a security mechanism that allows restricted resources to be requested from another domain."
    }
    
];

// Quiz functionality
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentSlide = 0;
const userAnswers = new Array(quizData.length).fill(null);

function buildQuiz() {
    quizContainer.innerHTML = '';
    
    quizData.forEach((questionData, questionIndex) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h3>${questionIndex + 1}. ${questionData.question}</h3>
            <div class="options">
                ${questionData.options.map((option, optionIndex) => `
                    <div class="option ${userAnswers[questionIndex] === optionIndex ? 'selected' : ''}" 
                         data-question="${questionIndex}" 
                         data-option="${optionIndex}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionElement);
    });
    
    showSlide(currentSlide);
}

function showSlide(n) {
    // Hide all questions
    const questions = quizContainer.querySelectorAll('.question');
    questions.forEach(question => {
        question.style.display = 'none';
    });
    
    // Show the current question
    questions[n].style.display = 'block';
    
    // Update button states
    prevButton.disabled = n === 0;
    nextButton.disabled = n === questions.length - 1;
    
    if (n === questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showResults() {
    // Calculate score
    const score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === quizData[index].correct ? 1 : 0);
    }, 0);
    
    // Display results
    resultsContainer.innerHTML = `
        <h3>Your score: ${score} out of ${quizData.length}</h3>
        ${quizData.map((questionData, questionIndex) => {
            const userAnswer = userAnswers[questionIndex];
            const isCorrect = userAnswer === questionData.correct;
            
            return `
                <div class="result-item">
                    <p><strong>${questionIndex + 1}. ${questionData.question}</strong></p>
                    <p>Your answer: ${userAnswer !== null ? questionData.options[userAnswer] : 'Not answered'} 
                       <span class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '✓' : '✗'}</span></p>
                    ${!isCorrect ? `<p>Correct answer: ${questionData.options[questionData.correct]}</p>` : ''}
                </div>
            `;
        }).join('')}
    `;
    
    resultsContainer.classList.add('fade-in');
}

// Event listeners for quiz
prevButton.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

submitButton.addEventListener('click', showResults);

quizContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('option')) {
        const questionIndex = parseInt(e.target.getAttribute('data-question'));
        const optionIndex = parseInt(e.target.getAttribute('data-option'));
        
        userAnswers[questionIndex] = optionIndex;
        
        // Update UI
        const options = quizContainer.querySelectorAll(`.option[data-question="${questionIndex}"]`);
        options.forEach(option => option.classList.remove('selected'));
        e.target.classList.add('selected');
    }
});

// Carousel functionality
const carouselSlides = document.querySelector('.carousel-slides');
const carouselSlideItems = document.querySelectorAll('.carousel-slide');
const prevControl = document.querySelector('.carousel-control.prev');
const nextControl = document.querySelector('.carousel-control.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let currentIndex = 0;
let autoPlayInterval;

// Create indicators
carouselSlideItems.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.indicator');

function goToSlide(index) {
    currentIndex = index;
    carouselSlides.style.transform = `translateX(-${index * 100}%)`;
    
    // Update active indicator
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % carouselSlideItems.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentIndex - 1 + carouselSlideItems.length) % carouselSlideItems.length;
    goToSlide(prevIndex);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Event listeners for carousel
prevControl.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
});

nextControl.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
});

// Pause autoplay when hovering over carousel
document.querySelector('.carousel').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.carousel').addEventListener('mouseleave', startAutoPlay);

// API functionality
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather');
const weatherData = document.getElementById('weather-data');

async function getWeatherData(city) {
    try {
        // Using OpenWeatherMap API - you might need to get your own API key
        const apiKey = '6f94712c76120f72878663bb8eaeafec'; 
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        weatherData.innerHTML = `<p class="error">${error.message}. Please try again.</p>`;
    }
}

function displayWeatherData(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    
    weatherData.innerHTML = `
        <div class="weather-card">
            <h3>Weather in ${name}</h3>
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            </div>
            <div class="weather-temp">${Math.round(temp)}°C</div>
            <div class="weather-desc">${description}</div>
            <div>Humidity: ${humidity}%</div>
            <div>Wind speed: ${speed} m/s</div>
        </div>
    `;
}

// Event listener for weather API
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        weatherData.innerHTML = '<p>Loading weather data...</p>';
        getWeatherData(city);
    } else {
        weatherData.innerHTML = '<p class="error">Please enter a city name</p>';
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherBtn.click();
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    buildQuiz();
    startAutoPlay();
    
    // For demo purposes, using a default city if API key is not available
    // getWeatherData('London');
});