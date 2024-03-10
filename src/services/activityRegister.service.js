const Activity = require('../models/activityRegister.model');

module.exports = {
    async logUserLogin(userId) {
        try {
            // Crear un nuevo registro de actividad con el ID de usuario proporcionado
            const activity = new Activity({ userId });

            // Obtener la fecha y hora actual en UTC/GMT
            const timestampUTC = new Date();

            // Ajustar la fecha y hora a la zona horaria de Colombia (GMT-5)
            const timestampColombia = new Date(timestampUTC.getTime() - (5 * 60 * 60 * 1000));

            // Asignar la fecha y hora ajustadas al registro de actividad
            activity.timestamp = timestampColombia;

            await activity.save();
            console.log(`Registro de actividad creado para el usuario ${userId}`);
        } catch (error) {
            console.error('Error al crear el registro de actividad:', error);
            throw error; // Puedes manejar este error según las necesidades de tu aplicación
        }
    },

    async getActivityCountByDay(dateString) {
        try {
            // Obtener la fecha en el huso horario local de Colombia
            const dateColombia = new Date(dateString);

            // Obtener la fecha de inicio del día en Colombia
            const startOfDay = new Date(dateColombia);
            startOfDay.setUTCHours(0, 0, 0, 0);

            // Obtener la fecha de fin del día en Colombia
            const endOfDay = new Date(dateColombia);
            endOfDay.setUTCHours(23, 59, 59, 999);

            const activities = await Activity.find({
                timestamp: { $gte: startOfDay, $lte: endOfDay }
            });

            console.log('hora inicio', startOfDay);
            console.log('hora fin', endOfDay);

            // Inicializar arreglos para contener el conteo por hora de la mañana y la tarde
            const morningCounts = Array.from({ length: 12 }, () => 0);
            const afternoonCounts = Array.from({ length: 12 }, () => 0);

            // Iterar sobre las actividades para contarlas por hora
            activities.forEach(activity => {
                const hour = new Date(activity.timestamp).getUTCHours();
                if (hour < 12) {
                    morningCounts[hour]++;
                } else {
                    afternoonCounts[hour - 12]++; // Ajustar para la tarde (12-23 horas)
                }
            });

            // Calcular el total de cada serie
            const totalMorning = morningCounts.reduce((total, count) => total + count, 0);
            const totalAfternoon = afternoonCounts.reduce((total, count) => total + count, 0);

            // Construir los datos para el gráfico
            const labels = Array.from({ length: 12 }, (_, i) => i);
            const series = [
                {
                    name: 'Mañana',
                    data: morningCounts,
                    total: totalMorning
                },
                {
                    name: 'Tarde',
                    data: afternoonCounts,
                    total: totalAfternoon
                }
            ];

            return { labels, series };
        } catch (error) {
            console.error('Error al obtener el recuento de actividades por día:', error);
            throw error;
        }
    },

    async getActivitiesByMonthAndYear(month, year) {
        try {
            // Validar que el mes esté en el rango de 1 a 12
            if (month < 1 || month > 12) {
                throw new Error("El número de mes debe estar entre 1 y 12");
            }
    
            // Obtener el primer día del mes
            const startDate = new Date(year, month - 1, 1);
    
            // Obtener el último día del mes
            const endDate = new Date(year, month, 0);
            endDate.setUTCHours(23, 59, 59, 999);
    
            const activities = await Activity.find({
                timestamp: { $gte: startDate, $lte: endDate }
            });
    
            const visitsByDayDetails = {};
    
            activities.forEach(activity => {
                // Obtener la fecha del inicio de sesión en el formato MM/DD/AAAA
                const loginDate = activity.timestamp.toISOString().slice(5, 10) + '/' + activity.timestamp.getFullYear(); // Formato MM/DD/AAAA
    
                console.log('Fecha:', loginDate);
                console.log('Registros de actividad:', activity);
    
                if (!visitsByDayDetails[loginDate]) {
                    visitsByDayDetails[loginDate] = {
                        morning: 0,
                        afternoon: 0
                    };
                }
    
                // Obtener la hora del inicio de sesión
                const hour = activity.timestamp.getUTCHours();
    
                // Incrementar el contador correspondiente a la franja horaria (mañana o tarde)
                if (hour < 12) {
                    visitsByDayDetails[loginDate].morning++;
                } else {
                    visitsByDayDetails[loginDate].afternoon++;
                }
            });
    
            // Construir los datos para el gráfico
            const labels = Object.keys(visitsByDayDetails).sort(); // Ordenar las fechas
            const series = [
                {
                    name: 'Mañana',
                    data: labels.map(date => visitsByDayDetails[date].morning),
                    total: labels.reduce((total, date) => total + visitsByDayDetails[date].morning, 0)
                },
                {
                    name: 'Tarde',
                    data: labels.map(date => visitsByDayDetails[date].afternoon),
                    total: labels.reduce((total, date) => total + visitsByDayDetails[date].afternoon, 0)
                }
            ];
    
            return { labels, series };
        } catch (error) {
            console.error('Error al obtener las actividades por mes y año:', error);
            throw error;
        }
    }
    
    
    


}
