# Mapping Vandy
---
### Version 0.1
this is the inital version on the site. 

---
Mapping Vandy (currently) allows the user to  view the differnet building on the Vandy campus. 


---
## technologies
    * leaflet.js
    * mapbox.com (tile layers)
    * bootstrap
    * jquery

---
## v 0. features
    1. As a user, I can view all buildings on campus
    2. As a user, I can view only buildings by type
    3. As a user, I can reset the normal view
    4. As a user, I can select an individual building
        * the building will center on map
        * the popup will open
    5. add more...

---

## sample json 

```javascript
{
                "type": "Feature",
        "properties": {
        "name": "PRB (Preston Research Bldg)",
          "address": "1301 Medical Center Dr", 
          "alt_addres": null, 
          "type": "research", 
          "notes": "above the TVC docks, elevator access from south side of dock."
        },
          "geometry" : {
             "type" : "Point", 
             "coordinates" : [-86.802791,36.140509]
            }
            }
            
            ```
---
## future features

    1. as a user, I can signup
    2. as a user, I can login
    3. as a user, I can add buildings
    4. as a user, I can modify content of popup
