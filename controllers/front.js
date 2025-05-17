import path from 'path'
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import receptionService from '../service/reception.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default class FrontController {

    static async renderPartial(partialName, data = {}) {
        const partialPath = path.join('views', `${partialName}.ejs`);
        try {
            const html = await ejs.renderFile(partialPath, data);
            return html;
        } catch (error) {
            console.error(`Error al renderizar parcial ${partialName}:`, error);
            // Puedes retornar un string de error, vacío, o lanzar la excepción
            return `<p style="color: red;">Error al cargar el encabezado: ${partialName}</p>`;
        }
    }

    static async getDashboard(req, res, next) {


        const recepciones = await receptionService.getFullReceptions();
        // console.log(recepciones)
        const content = await FrontController.renderPartial('panel', { recepciones });
        const mainData = {
            content
        };
        res.render('sbadmin', mainData)
    }

    static async getReceptions(req, res) {
        const content = await FrontController.renderPartial('receptions');
    
        const mainData = {
            content,
        };
        res.render('sbadmin', mainData)
    }

    static async getReports(req, res) {
        const content = await FrontController.renderPartial('reports');
    
        const mainData = {
            content,
        };
        res.render('sbadmin', mainData)
    }

    static async getBios(req, res) {
        const content = await FrontController.renderPartial('bios');
    
        const mainData = {
            content,
        };
        res.render('sbadmin', mainData)
    }

    static async getIncidents(req, res) {
        const content = await FrontController.renderPartial('incidents');
    
        const mainData = {
            content,
        };
        res.render('main', mainData)
    }
}