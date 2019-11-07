function Swizzle(obj, swizzables) {
    const _ignoreCharacter = '@';
    function getProperties(obj, key) {
        const requestedProperties = [];
        let propertyIndex = -1;
        swizzables.forEach(x => {
            while ((propertyIndex = key.indexOf(x)) > -1) {
                requestedProperties.push({ index: propertyIndex, property: x });
                key = key.replace(x, _ignoreCharacter.repeat(x.length));
            }
        });
       
        return requestedProperties.sort((a, b) => {
            if (a.index < b.index) { return -1; }
            if (a.index > b.index) { return 1; }
            return 0;
        });
    }
    
    return new Proxy(obj, {
        get(target, key, context) {
            const result = [];
            getProperties(obj, key).forEach((x, i) => {
                result.push(Reflect.get(target, x.property, context));
            });

            if (result.length == 0) {
            	return Reflect.get(target, key, context);
            }
            
            return result.length == 1 ? result[0] : result;
        },
       
        set(obj, prop, value) {
            getProperties(obj, prop).forEach((x, i) => {
                Reflect.set(obj, x.property, properties.length == 1 ? value : value[i]);
            });
        }
    });
}
