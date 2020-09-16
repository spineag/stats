import arrow
import dateutil
import requests

MAP_GENERATION = {
    'aes': 'nuclear',
    'tec': 'gas',
    'tes': 'coal',
    'vde': 'wind',
    'biomass': 'biomass',
    'gesgaes': 'hydro',
    'solar': 'solar',
    'oil': 'oil',
    'geothermal': 'geothermal',
}

MAP_STORAGE = {
    'consumptiongaespump': 'hydro',
}
    
def fetch_production(session=None):
    r = session or requests.session()

    data = []
    today = arrow.now(tz='Europe/Kiev').format('DD.MM.YYYY')
    url = 'https://ua.energy/wp-admin/admin-ajax.php'
    postdata = {
        'action': 'get_data_oes',
        'report_date': today,
        'type': 'day'
    }

    response = r.post(url, postdata)

    for serie in response.json():
        row = {
            'countryCode': 'UA',
            'production': {},
            'storage': {},
            'source': 'ua.energy'
        }

        # Storage
        if 'consumptiongaespump' in serie:
            row['storage']['hydro'] = serie['consumptiongaespump'] * -1

        # Production
        for k, v in MAP_GENERATION.items():
            if k in serie:
                row['production'][v] = serie[k]
            else:
                row['production'][v] = 0.0

        # Date
        date = arrow.get('%s %s' % (today, serie['hour']), 'DD.MM.YYYY HH:mm')
        row['datetime'] = date.replace(tzinfo=dateutil.tz.gettz(tz)).datetime

        data.append(row)
    return data

print(fetch_production())