/* ========================================
   AI PORTFOLIO ASSISTANT — Rule-based Q&A
   Answers from Gowtham's portfolio data.
   ======================================== */

(function () {
  'use strict';

  // ========================================
  // KNOWLEDGE BASE
  // ========================================

  const data = {
    intro: "Hi! I'm Gowtham's AI assistant. I can help you learn about his projects, skills, education, experience, and how to get in touch.",
    contact: {
      email: 'gowtham120205@gmail.com',
      github: 'https://github.com/GowthamAI-ENGR',
      linkedin: 'https://www.linkedin.com/in/gowtham-ravi-12ph27b2532a6'
    },
    about: 'Gowtham Ravi is an AI/ML Engineer and M.Sc. Artificial Intelligence candidate who builds practical, data-driven solutions. His interests span machine learning, deep learning, data analysis, and intelligent application development.',
    skills: [
      'Python', 'R', 'SQL', 'HTML',
      'Machine Learning', 'Deep Learning', 'Neural Networks',
      'TensorFlow', 'PyTorch', 'scikit-learn',
      'EDA', 'Statistical Modelling', 'Data Analysis',
      'Git', 'GitHub', 'Jupyter Notebook', 'Google Colab',
      'Full Stack Development', 'APIs', 'Databases'
    ],
    projects: [
      {
        name: 'Maternal Health Risk Prediction',
        type: 'Machine Learning',
        stack: 'Python, scikit-learn, Streamlit',
        description: 'An ML-powered healthcare application that predicts pregnancy-related risk levels using maternal health parameters such as blood pressure, glucose levels, and heart rate.'
      },
      {
        name: 'Crop Recommendation System',
        type: 'Agriculture',
        stack: 'Python, Random Forest, Decision Trees, Streamlit',
        description: 'Analyzes soil and environmental conditions (N, P, K, temperature, humidity, pH, rainfall) to recommend suitable crops.'
      },
      {
        name: 'Movie Recommendation System',
        type: 'Recommendation',
        stack: 'Python, Machine Learning, Streamlit',
        description: 'A machine-learning application that helps users discover movies based on their preferences and viewing patterns.'
      }
    ],
    experience: 'Full Stack Web Developer Intern at HodoLabs (2026) — feature development, API integration, database & CRUD operations, debugging & testing, responsive UI design, and deployment.',
    education: [
      'M.Sc. Artificial Intelligence, St. Joseph\'s College (Autonomous), Trichy — expected 2027',
      'B.Sc. Computer Science, Srimad Andavan Arts & Science College — 2022 to 2025'
    ],
    certifications: [
      'Mastering Statistics using R — Great Learning',
      'AI/ML for Geodata Analysis — Professional Course',
      'Introduction to Neural Networks & Learning — ISRO',
      'Introduction to Deep Learning — NPTEL',
      'ChatGPT for Beginners — Great Learning',
      'Exploring Earth\'s Moon through Chandrayaan — ISRO',
      'Basics of Exploratory Data Analysis — Professional Course',
      'Online Courses — Great Learning / NPTEL'
    ],
    location: 'Trichy, Tamil Nadu, India'
  };

  // ========================================
  // ANSWER ENGINE
  // ========================================

  function normalize(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function includesAny(text, keywords) {
    const n = normalize(text);
    return keywords.some((k) => n.includes(k));
  }

  function isGreeting(text) {
    const n = normalize(text);
    return /\b(hello|hi|hey|greetings|good (morning|afternoon|evening))\b/.test(n);
  }

  function buildAnswer(input) {
    const raw = input.toLowerCase();

    // Greetings
    if (isGreeting(raw)) {
      return data.intro;
    }

    // Projects overview
    if (includesAny(raw, ['projects', 'built', 'build', 'portfolio work', 'playground', 'showcase'])) {
      return 'Gowtham has built 3 featured ML projects:\n\n' +
        '1. Maternal Health Risk Prediction — ML healthcare app predicting pregnancy-related risk levels (Python, scikit-learn, Streamlit).\n' +
        '2. Crop Recommendation System — recommends crops from soil & climate data (Python, Random Forest, Streamlit).\n' +
        '3. Movie Recommendation System — helps users discover movies from viewing patterns (Python, ML, Streamlit).\n\n' +
        'Ask me about any of them for more detail!';
    }

    // Healthcare project
    if (includesAny(raw, ['health', 'healthcare', 'maternal', 'pregnancy', 'medical'])) {
      return 'The Maternal Health Risk Prediction is an ML-powered healthcare application that predicts pregnancy-related risk levels (low/medium/high) using parameters like blood pressure, glucose levels, and heart rate. Stack: Python, scikit-learn, and Streamlit. There is a live demo and GitHub repo linked in the Projects section.';
    }

    // Crop project
    if (includesAny(raw, ['crop', 'agriculture', 'soil']) && !includesAny(raw, ['project', 'portfolio'])) {
      return 'The Crop Recommendation System analyzes soil and environmental conditions — N, P, K, temperature, humidity, pH, and rainfall — to recommend the most suitable crops. It uses Python, Random Forest, and Decision Trees on a Streamlit dashboard.';
    }

    // Movie project
    if (includesAny(raw, ['movie', 'film', 'recommendation system', 'discover movies'])) {
      return 'The Movie Recommendation System uses machine learning to help users discover movies based on their preferences and viewing patterns. It is built with Python, scikit-learn, and Streamlit, and has a live demo in the Projects section.';
    }

    // Skills / technologies
    if (includesAny(raw, ['technology', 'technologies', 'skills', 'stack', 'tools', 'language', 'libraries', 'tech '])) {
      return "Gowtham's core toolkit:\n" +
        'Programming: Python, R, SQL, HTML\n' +
        'AI/ML: Machine Learning, Deep Learning, Neural Networks, TensorFlow, PyTorch, scikit-learn\n' +
        'Data: EDA, Statistical Modelling, Data Analysis\n' +
        'Tools: Git, GitHub, Jupyter Notebook, Google Colab\n' +
        'Plus full-stack skills: APIs, databases, CRUD, testing, and deployment.';
    }

    // Experience
    if (includesAny(raw, ['experience', 'intern', 'job', 'work', 'hodo', 'career'])) {
      return 'Gowtham is a Full Stack Web Developer Intern at HodoLabs (2026), where he works on feature development, API integration, database & CRUD operations, debugging & testing, responsive UI design, and deployment.';
    }

    // Education
    if (includesAny(raw, ['education', 'study', 'studied', 'degree', 'college', 'university', 'master', 'bachelor', 'academic'])) {
      return "Education:\n" +
        "• M.Sc. Artificial Intelligence — St. Joseph's College (Autonomous), Trichy (expected 2027)\n" +
        '• B.Sc. Computer Science — Srimad Andavan Arts & Science College (2022-2025)';
    }

    // Certifications
    if (includesAny(raw, ['certif', 'course', 'training', 'credential'])) {
      return 'Certifications:\n' +
        '• Mastering Statistics using R (Great Learning)\n' +
        '• AI/ML for Geodata Analysis\n' +
        '• Introduction to Neural Networks & Learning (ISRO)\n' +
        '• Introduction to Deep Learning (NPTEL)\n' +
        '• ChatGPT for Beginners (Great Learning)\n' +
        '• Exploring Earth\'s Moon through Chandrayaan (ISRO)\n' +
        '• Basics of Exploratory Data Analysis\n' +
        '• Various online courses from Great Learning & NPTEL';
    }

    // Location
    if (includesAny(raw, ['where', 'location', 'based', 'trichy', 'live', 'city', 'address'])) {
      return 'Gowtham is based in Trichy, Tamil Nadu, India.';
    }

    // Contact
    if (includesAny(raw, ['contact', 'email', 'reach', 'connect', 'hiring', 'hire', 'work with', 'collaborate'])) {
      return 'You can reach Gowtham via:\n' +
        'Email: gowtham120205@gmail.com\n' +
        'GitHub: github.com/GowthamAI-ENGR\n' +
        'LinkedIn: linkedin.com/in/gowtham-ravi-12ph27b2532a6\n\n' +
        'There is also a contact form in the Get In Touch section — feel free to send a message.';
    }

    // Resume
    if (includesAny(raw, ['resume', 'cv', 'download resume', 'pdf'])) {
      return 'You can view Gowtham\'s resume by clicking the "View Resume" button in the hero section, or download it directly with "Download Resume".';
    }

    // About
    if (includesAny(raw, ['about', 'who is', 'tell me', 'background', 'yourself'])) {
      return data.about;
    }

    // Thanks
    if (includesAny(raw, ['thank', 'thanks', 'great', 'awesome', 'good', 'nice'])) {
      return "You're welcome! Feel free to ask me anything else about Gowtham, or use the contact form to get in touch.";
    }

    // Default fallback
    return 'I can tell you about Gowtham\'s projects, skills, experience, education, certifications, or how to contact him. Try one of the quick questions above, or type something like "What projects has he built?"';
  }

  // ========================================
  // UI LOGIC
  // ========================================

  const fab = document.getElementById('assistantFab');
  const panel = document.getElementById('assistantPanel');
  const messages = document.getElementById('assistantMessages');
  const suggestions = document.getElementById('assistantSuggestions');
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  const closeBtn = document.getElementById('assistantClose');
  const assistantRoot = document.getElementById('assistant');

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `assistant-msg assistant-msg-${sender}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  function showTyping() {
    const msg = document.createElement('div');
    msg.className = 'assistant-msg assistant-msg-bot assistant-msg-typing';
    msg.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  function respond(query) {
    addMessage(query, 'user');
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMessage(buildAnswer(query), 'bot');
    }, 600 + Math.random() * 400);
  }

  function openAssistant() {
    assistantRoot.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    setTimeout(() => input.focus(), 250);
  }

  function closeAssistant() {
    assistantRoot.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }

  if (fab) fab.addEventListener('click', () => {
    if (assistantRoot.classList.contains('open')) {
      closeAssistant();
    } else {
      openAssistant();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeAssistant);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      input.value = '';
      respond(query);
    });
  }

  if (suggestions) {
    suggestions.addEventListener('click', (e) => {
      const chip = e.target.closest('.assistant-chip');
      if (!chip) return;
      respond(chip.getAttribute('data-query'));
    });
  }
})();