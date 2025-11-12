export function isWithinWorkingHours(user: { WorkingHours: Array<{ dayOfWeek: string, checkInTime: Date, departureTime: Date }> }): boolean {
    const now = new Date();
    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const currentDay = daysOfWeek[now.getDay()];
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const todayWorkingHours = user.WorkingHours.find(wh => wh.dayOfWeek === currentDay);

    if (!todayWorkingHours) {
        return false; // No working hours defined for today
    }

    const checkInMinutes = todayWorkingHours.checkInTime.getUTCHours() * 60 + todayWorkingHours.checkInTime.getUTCMinutes();
    const departureMinutes = todayWorkingHours.departureTime.getUTCHours() * 60 + todayWorkingHours.departureTime.getUTCMinutes();

    return nowMinutes >= checkInMinutes && nowMinutes <= departureMinutes;
}