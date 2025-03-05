import PropTypes from 'prop-types';

const UserModel = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  cellPhone: PropTypes.number.isRequired
};

export default UserModel;
