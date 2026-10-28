import "./Footer.css";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6a12 12 0 0 0 5.9 1.5h.1c6.6 0 12-5.4 12-12a11.8 11.8 0 0 0-3.7-8.4ZM12.1 21.8a9.9 9.9 0 0 1-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A9.8 9.8 0 0 1 2.1 12c0-5.5 4.5-10 10-10 2.7 0 5.2 1 7.1 2.9a9.9 9.9 0 0 1 2.9 7.1c0 5.4-4.5 9.8-10 9.8Zm5.5-7.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.3.2-.6.2-1.1.2-1.3-.1-.2-.3-.3-.6-.4Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2Zm10.3 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8h1.9V2.4c-.3 0-1.5-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9v2.4H6.5V13h3.2v9h3.8Z" />
      </svg>
    ),
  },
];

export const Footer = () => {
  return (
    <footer className="site-footer">
      <p className="site-footer__brand">MarketTech</p>
      <nav aria-label="Redes sociales">
        <ul className="site-footer__socials">
          {socialLinks.map(({ name, href, icon }) => (
            <li key={name}>
              <a href={href} target="_self" rel="noreferrer">
                {icon}
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
