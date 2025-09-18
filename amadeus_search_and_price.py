
# amadeus_search_and_price.py
import requests, json, sys

CLIENT_ID = "n4XlerdBg4X9GVMqVdthRYepClg9LAre"
CLIENT_SECRET = "D7hr9QA4rZaACwhr"

def get_token():
    url = "https://api.amadeus.com/v1/security/oauth2/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    r = requests.post(url, data=data)
    r.raise_for_status()
    return r.json()["access_token"]

def search_offers(token, origin="EZE", destination="AGP", date="2025-12-05", adults=1, max_offers=5):
    url = "https://api.amadeus.com/v2/shopping/flight-offers"
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "originLocationCode": origin,
        "destinationLocationCode": destination,
        "departureDate": date,
        "adults": adults,
        "max": max_offers
    }
    r = requests.get(url, headers=headers, params=params)
    r.raise_for_status()
    data = r.json().get("data", [])
    # Guardar por si queremos chequear después
    with open("offers_raw.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    return data

def print_summary(offers):
    if not offers:
        print("No hay ofertas.")
        return
    for i, o in enumerate(offers, start=1):
        price = o.get("price", {})
        total = price.get("total")
        currency = price.get("currency")
        offer_id = o.get("id", "N/A")
        last_ticket = o.get("lastTicketingDate", "N/A")
        print(f"{i}) id: {offer_id} — {total} {currency} — lastTicketingDate: {last_ticket}")
        # mostrar aerolínea principal y duración resumida
        itineraries = o.get("itineraries", [])
        seg_count = sum(len(it.get("segments", [])) for it in itineraries)
        print(f"   Itinerarios: {len(itineraries)}, segmentos totales: {seg_count}")
        print("   ---")

def price_offer(token, offer):
    url = "https://api.amadeus.com/v1/shopping/flight-offers/pricing"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    body = {"data": offer}   # si tu SDK o API pide formato distinto, lo ajustamos
    r = requests.post(url, headers=headers, json=body)
    if r.status_code != 200:
        print("Pricing failed:", r.status_code, r.text)
        return None
    resp = r.json()
    with open("offer_pricing.json", "w", encoding="utf-8") as f:
        json.dump(resp, f, indent=2, ensure_ascii=False)
    return resp

def main():
    try:
        token = get_token()
    except Exception as e:
        print("Error obteniendo token:", e)
        sys.exit(1)

    offers = search_offers(token)
    print_summary(offers)

    if not offers:
        return

    # Elegimos la primera oferta para revalidar (cambiá el índice si querés otra)
    chosen = offers[0]
    print("\nRevalidando (pricing) la primera oferta...")
    pricing_resp = price_offer(token, chosen)
    if pricing_resp:
        print("Pricing OK. Revisa 'offer_pricing.json' para detalles.")
    else:
        print("La oferta ya no está disponible o ocurrió un error en pricing.")

if __name__ == "__main__":
    main()




