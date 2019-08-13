export default class Notificacion {

  static TIPO_NOTIFICACION_GENERAL = 1;
  static TIPO_NOTIFICACION_PERSONAL = 2;
  static TIPO_NOTIFICACION_AREA_KID = 3;
  static TIPO_NOTIFICACION_AREA_USER = 4;
  static TIPO_ALARMA = 5;

  static NotificacionSchema = {
    name: 'Notificacion',
    properties: {
      tipo: 'int',
      tittle: 'string',
      message: 'string',
      timestamp: 'string',
    }
  };

  constructor(tipo, tittle, message, timestamp) {
    this.tipo = tipo || this.TIPO_NOTIFICACION_GENERAL;
    this.tittle = tittle || '';
    this.message = message || '';
    this.timestamp = timestamp || 0;
  }
}

