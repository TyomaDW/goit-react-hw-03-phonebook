import PropTypes from 'prop-types';

import styles from './Section.module.scss';

const Section = props => {
  return (
    <section className={styles.section}>
      {props.title && <span className={styles.title}>{props.title}</span>}
      {props.children}
    </section>
  );
};

Section.defaultProps = {
  title: '',
  children: [],
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Section;
