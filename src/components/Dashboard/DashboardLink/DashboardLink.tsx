import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DashboardLink.module.css';

type DashboardLinkProps = {
  href: string;
  icon: string[];
  text: string;
}

function DashboardLink({ href, icon, text }: DashboardLinkProps) {
  return (
    <Link className={styles.DashboardLink} to={href}>
      {/* @ts-ignore */}
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </Link>
  );
}

export default DashboardLink;
