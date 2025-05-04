const path = require('path');

class FrontController {

    static async getIndex(req, res) {
        try {
            const filePath = path.join(__dirname, '..', 'public', 'html', 'index.html');
            res.sendFile(filePath);

        } catch (error) {
            // console.error('Error al obtener la pagina recepciones:', error)
            // res.status(500).json({
            //     msj: 'Error al obtener la pagina recepciones'
            // })
        }
    }
    static async getReports(req, res) {
        try {
            const filePath = path.join(__dirname, '..', 'public', 'html', 'reports.html');
            res.sendFile(filePath);

        } catch (error) {
            console.error('Error al obtener la pagina reportes:', error)
            res.status(500).json({
                msj: 'Error al obtener la pagina reportes'
            })
        }
    }
    static async getReceptions(req, res) {
        try {
            const filePath = path.join(__dirname, '..', 'public', 'html', 'receptions.html');
            res.sendFile(filePath);

        } catch (error) {
            console.error('Error al obtener la pagina recepciones:', error)
            res.status(500).json({
                msj: 'Error al obtener la pagina recepciones'
            })
        }
    }
}

module.exports = FrontController;