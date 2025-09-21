
import requests, json

# 🔑 Tus credenciales (cambiá por las tuyas reales)
API_KEY = "av95BWYs58Fk0icGsDu7LnCqnQeqOewN"
API_SECRET = "rKYAzxL9eLK0bvDk"

# 1) Pedir token a Amadeus
auth_url = "https://test.api.amadeus.com/v1/security/oauth2/token"
auth_data = {
    "grant_type": "client_credentials",
    "client_id": API_KEY,
    "client_secret": API_SECRET
}
auth_resp = requests.post(auth_url, data=auth_data)
token = auth_resp.json()["access_token"]

# 2) Buscar vuelos (ejemplo: EZE → MAD)
search_url = "https://test.api.amadeus.com/v2/shopping/flight-offers"
params = {
    "originLocationCode": "EZE",
    "destinationLocationCode": "MAD",
    "departureDate": "2025-10-10",
    "adults": 1,
    "currencyCode": "USD",
    "max": 5
}
headers = {"Authorization": f"Bearer {token}"}
resp = requests.get(search_url, headers=headers, params=params)
offers = resp.json().get("data", [])

# 3) Transformar datos
results = []
for offer in offers:
    price = offer["price"]["total"]
    currency = offer["price"]["currency"]
    airline = offer["validatingAirlineCodes"][0] if offer.get("validatingAirlineCodes") else "N/A"

    results.append({
        "id": offer["id"],
        "airline": airline,
        "price": f"{price} {currency}",
        "segments": sum(len(i["segments"]) for i in offer["itineraries"])
    })

# 4) Guardar en archivo JSON
with open("offers.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"✅ Guardado {len(results)} ofertas en offers.json")
