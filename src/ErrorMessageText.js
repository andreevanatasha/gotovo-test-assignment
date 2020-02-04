import PropTypes from "prop-types";

export default function ErrorMessageText(error) {
  switch (error) {
    case "parsing_error":
      return "Не смогли определить адрес";
    case "offline":
      return "Нет подключения к интернету";
    case "nothing_found":
      return "Ничего не нашлось";
    default:
      return "Неизвестная ошибка";
  }
}

ErrorMessageText.propTypes = {
  error: PropTypes.string
};
