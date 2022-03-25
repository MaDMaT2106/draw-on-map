import React from "react";
import { useDispatch } from "react-redux";

import { setModal, setInfoText } from "../../redux/actions/text";

import styles from "./Text.module.css";

const Text = () => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const values = {
      title: e.target[0].value,
      description: e.target[0].value,
    };

    dispatch(setInfoText(values));
    dispatch(setModal(false));
  };

  return (
    <div className={styles.textContainer}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formBlock}>
          <label>Title</label>
          <input type="text" className={styles.input} name="title" />
        </div>
        <div className={styles.formBlock}>
          <label>Description</label>
          <textarea className={styles.input} name="description" />
        </div>
        <div className={styles.submitBlock}>
          <input type="submit" value="Post" />
        </div>
      </form>
    </div>
  );
};

export default Text;
