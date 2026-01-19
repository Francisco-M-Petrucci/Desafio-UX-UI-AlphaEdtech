document.addEventListener('DOMContentLoaded', () => {
  // Seleciona TODOS os botões de idioma (Desktop e Mobile)
  const btnLanguages = document.querySelectorAll('.btn-language');

  const translations = {
    en: {
      btnLabel: 'Pt-Br',
      nav: ["Home", "About", "Skills", "Projects", "Contact"],
      heroName: "Francisco M. Petrucci",
      heroTitle: "PROGRAMMING STUDENT",
      heroDesc: "Aspiring coder with a passion for developing innovative and efficient solutions.",
      heroBtns: ["My Projects", "Get in touch"],
      aboutTitle: "About Me",
      aboutText: "An up-and-coming developer with the passion to build web applications from the ground up. A student of the high-end Alpha Edtech course on programming, I am in the process of learning to create responsive, user-friendly interfaces and robust backend systems. My other skills include a C2 level profficiency in the english language, and a strong ability to adapt and learn new technologies quickly.",
      skillsTitle: "Skills & Tools",
      projectsTitle: "My Projects",
      projectTitles: ["CSS Exercise Page", "Layout Replication", "Product Registration Page"],
      projectDescs: [
        "First contact with HTML/CSS web building. My starting point.",
        "HTML/CSS exercise to replicate the design on a given page. Shows my evolution.",
        "Javascript exercise to create a product registration page. An example on functional design."
      ],
      contactTitle: "Contacts",
      contactText: "I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out directly via email or check my social networks.",
      formLabels: ["Name", "Message"],
      placeholders: ["Your name", "your@email.com", "How can I help you?"],
      formBtn: "Send Message",
      footerCopyright: "© 2026 Francisco M. Petrucci. All rights reserved.",
      footerTagline: "Project developed for Alpha Edtech: Personal portfolio using HTML, CSS, Git, and Github."
    },
    pt: {
      btnLabel: 'English',
      nav: ["Início", "Sobre", "Habilidades", "Projetos", "Contato"],
      heroName: "Francisco M. Petrucci",
      heroTitle: "ESTUDANTE DE PROGRAMAÇÃO",
      heroDesc: "Aspirante a desenvolvedor com paixão por criar soluções inovadoras e eficientes.",
      heroBtns: ["Meus Projetos", "Entre em contato"],
      aboutTitle: "Sobre Mim",
      aboutText: "Um desenvolvedor em ascensão com a paixão de construir aplicações web do zero. Estudante do curso de alta performance Alpha Edtech, estou no processo de aprender a criar interfaces responsivas e amigáveis ao usuário, além de sistemas backend robustos. Minhas outras habilidades incluem proficiência nível C2 na língua inglesa e uma forte capacidade de adaptação e aprendizado de novas tecnologias rapidamente.",
      skillsTitle: "Habilidades & Ferramentas",
      projectsTitle: "Meus Projetos",
      projectTitles: ["Página de Exercícios CSS", "Replicação de Layout", "Página de Registro de Produtos"],
      projectDescs: [
        "Primeiro contato com construção web em HTML/CSS. Meu ponto de partida.",
        "Exercício de HTML/CSS para replicar o design de uma página específica. Demonstra minha evolução.",
        "Exercício de Javascript para criar uma página de registro de produtos. Um exemplo de design funcional."
      ],
      contactTitle: "Contatos",
      contactText: "Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades. Sinta-se à vontade para entrar em contato diretamente por e-mail ou conferir minhas redes sociais.",
      formLabels: ["Nome", "Mensagem"],
      placeholders: ["Seu nome", "seu@email.com", "Como posso ajudar?"],
      formBtn: "Enviar Mensagem",
      footerCopyright: "© 2026 Francisco M. Petrucci. Todos os direitos reservados.",
      footerTagline: "Projeto desenvolvido para Alpha Edtech: Portfólio pessoal utilizando HTML, CSS, Git e Github."
    }
  };

  let currentLang = 'en';

  // Aplica o evento em cada botão encontrado
  btnLanguages.forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'pt' : 'en';
      const data = translations[currentLang];

      // Seleciona elementos para o fade (exceto hero-name)
      const elementsToFade = document.querySelectorAll('.hero-title, .hero-description, .section-title, .about-content, .section-title2, .project-title, .project-description, .contact-text, .form-label, .footer-copyright, .footer-tagline, .nav-links a, .mobile-nav a, .btn-language span');
      
      elementsToFade.forEach(el => el.style.opacity = '0');

      // Tradução imediata do nome (sem fade)
      document.querySelector('.hero-name').textContent = data.heroName;

      setTimeout(() => {
        // 1. Sincroniza todos os botões de idioma
        btnLanguages.forEach(b => {
          b.querySelector('span').textContent = data.btnLabel;
        });

        // 2. Navegação
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
        navLinks.forEach((link, index) => {
          const textIndex = index % 5;
          link.textContent = data.nav[textIndex];
        });

        // 3. Hero
        document.querySelector('.hero-title').textContent = data.heroTitle;
        document.querySelector('.hero-description').textContent = data.heroDesc;
        const heroBtns = document.querySelectorAll('.hero-buttons .btn');
        heroBtns.forEach((btn, i) => { if(heroBtns[i]) btn.textContent = data.heroBtns[i] });

        // 4. About
        document.querySelector('.section-title').textContent = data.aboutTitle;
        document.querySelector('.about-content p').textContent = data.aboutText;

        // 5. Títulos das Seções
        const sectionTitles2 = document.querySelectorAll('.section-title2');
        if(sectionTitles2[0]) sectionTitles2[0].textContent = data.skillsTitle;
        if(sectionTitles2[1]) sectionTitles2[1].textContent = data.projectsTitle;

        // 6. Projetos
        const pTitles = document.querySelectorAll('.project-title');
        pTitles.forEach((title, i) => title.textContent = data.projectTitles[i]);
        const pDescs = document.querySelectorAll('.project-description');
        pDescs.forEach((desc, i) => desc.textContent = data.projectDescs[i]);

        // 7. Contato
        document.querySelector('#contact .section-title').textContent = data.contactTitle;
        document.querySelector('.contact-text').textContent = data.contactText;
        const formLabels = document.querySelectorAll('.form-label');
        const formInputs = document.querySelectorAll('.form-input');
        if(formLabels[0]) formLabels[0].textContent = data.formLabels[0];
        if(formLabels[1]) formLabels[1].textContent = data.formLabels[1];
        if(formInputs[0]) formInputs[0].placeholder = data.placeholders[0];
        if(formInputs[1]) formInputs[1].placeholder = data.placeholders[1];
        if(formInputs[2]) formInputs[2].placeholder = data.placeholders[2];
        document.querySelector('.btn-contact').textContent = data.formBtn;

        // 8. Footer
        document.querySelector('.footer-copyright').textContent = data.footerCopyright;
        document.querySelector('.footer-tagline').textContent = data.footerTagline;

        // Fade-in dos elementos
        elementsToFade.forEach(el => {
          el.style.transition = 'opacity 0.3s ease-in-out';
          el.style.opacity = '1';
        });
      }, 200);
    });
  });
});