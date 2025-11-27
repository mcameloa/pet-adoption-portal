/**
 * Controlador para la página de inicio
 */
class HomeController {
  /**
   * Renderiza la página de inicio
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  static index(req, res) {
    res.render('index', { title: 'Adopta un amigo' });
  }
}

module.exports = HomeController;

