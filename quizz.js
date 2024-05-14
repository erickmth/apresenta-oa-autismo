const questions = [
    {
      question: "1) O que é o Autismo?",
      options: ["Um transtorno de desenvolvimento neurológico", "Uma escolha de vida", "Uma doença contagiosa"],
      correct: 0
    },
    {
      question: "2) Qual destas é UMA característica comum do autismo?",
      options: ["Habilidade excepcional em esportes", "Alergia a certos alimentos", "Dificuldade em fazer contato visual"],
      correct: 2
    },
    {
      question: "3) O autismo pode ser “curado”?",
      options: ["Sim, com medicação adequada", "Não, mas pode ser gerenciado com terapias e suporte adequados", "Sim, com uma dieta especial"],
      correct: 1
    },
    {
      question: "4) Quando o autismo geralmente é diagnosticado?",
      options: ["Na adolescência", "Na infância", "Na idade adulta"],
      correct: 1
    },
    {
      question: "5) Por que é importante conscientizar sobre o autismo?",
      options: ["Para aumentar as vendas de livros sobre autismo.", "Para promover a compreensão, aceitação e inclusão de pessoas com autismo", "Para reduzir o custo dos cuidados de saúde"],
      correct: 1
    }
  ];
  
  let currentQuestion = 0;
  let correctAnswers = localStorage.getItem('correctAnswers') ? parseInt(localStorage.getItem('correctAnswers')) : 0;
  let quizCompleted = localStorage.getItem('quizCompleted') === 'true';
  
  const questionContainer = document.getElementById('question-container');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const nextButton = document.getElementById('next-button');
  const scoreContainer = document.getElementById('score');
  
  function loadQuestion() {
    if (quizCompleted) {
      questionContainer.innerHTML = 'Parabéns por completar o quiz!';
      nextButton.style.display = 'none';
      scoreContainer.textContent = `${correctAnswers}/${questions.length} Acertos!!`;
      if (correctAnswers >= 3) {
        scoreContainer.classList.add('score-green');
      } else {
        scoreContainer.classList.add('score-red');
      }
      return;
    }
  
    const questionData = questions[currentQuestion];
    questionText.textContent = questionData.question;
    optionsContainer.innerHTML = '';
  
    for (let i = 0; i < questionData.options.length; i++) {
      const option = document.createElement('a');
      option.classList.add('option');
      option.textContent = questionData.options[i];
  
      // Criando uma função específica para cada opção
      option.addEventListener('click', function handleClick(event) {
        checkAnswer(i);
        // Desativando a opção clicada
        option.classList.add('disabled');
        option.removeEventListener('click', handleClick); 
  
        // Desabilitando as outras opções
        optionsContainer.querySelectorAll('.option').forEach(otherOption => {
          if (otherOption !== option) {
            otherOption.classList.add('disabled');
            otherOption.removeEventListener('click', handleClick); 
          }
        });
      });
  
      optionsContainer.appendChild(option);
    }
  }
  
  function checkAnswer(selectedOption) {
    const questionData = questions[currentQuestion];
    const options = optionsContainer.querySelectorAll('.option');
  
    if (selectedOption === questionData.correct) {
      options[selectedOption].classList.add('correct');
      correctAnswers++;
      localStorage.setItem('correctAnswers', correctAnswers);
    } else {
      options[selectedOption].classList.add('wrong');
      options[questionData.correct].classList.add('correct');
    }
  
    nextButton.style.display = 'block';
  }
  
  function mostrarParabens() {
    const confettiContainer = document.querySelector('.confetti');
    for (let i = 0; i < 300; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.classList.add('confetti-piece');
      confettiPiece.style.left = `${Math.random() * 100}%`;
      confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
      confettiContainer.appendChild(confettiPiece);
    }
  }
  
  nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
      nextButton.style.display = 'none';
    } else {
      questionContainer.innerHTML = 'Parabéns por completar o quiz!'
      quizCompleted = true;
      localStorage.setItem('quizCompleted', 'true');
      nextButton.style.display = 'none';
      scoreContainer.textContent = `${correctAnswers}/${questions.length} Acertos!!`;
      if (correctAnswers >= 3) {
        scoreContainer.classList.add('score-green');
        mostrarParabens();
      } else {
        scoreContainer.classList.add('score-red');
      }
    }
  });
  
  loadQuestion();