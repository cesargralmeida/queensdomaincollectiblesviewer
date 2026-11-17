// Queen's Domain save reader. Runs entirely in the browser (or Node for testing).
// It does not fully parse the save: it looks up each collectible's save ID (GUID) in the raw bytes
// and reads the state value stored right after it in the SavableActorStates map.
(function (root) {
  'use strict';
  function hexToBytes(hex) {
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  }
  function asciiBytes(s) {
    const out = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) & 0xff;
    return out;
  }
  // Return all start offsets of `needle` in `hay`.
  function findAll(hay, needle) {
    const hits = [], n = needle.length, first = needle[0], end = hay.length - n;
    for (let i = hay.indexOf(first); i !== -1 && i <= end; i = hay.indexOf(first, i + 1)) {
      let ok = true;
      for (let j = 1; j < n; j++) if (hay[i + j] !== needle[j]) { ok = false; break; }
      if (ok) hits.push(i);
    }
    return hits;
  }
  function int32(bytes, p) {
    return bytes[p] | (bytes[p + 1] << 8) | (bytes[p + 2] << 16) | (bytes[p + 3] << 24);
  }
  // Values stored in string-keyed int maps (NamedSaveData, InventoryContents):
  // int32 length, the key, a NUL, then the int32 value.
  function namedInt(bytes, key) {
    const k = asciiBytes(key);
    const needle = new Uint8Array(k.length + 5);
    const len = k.length + 1;
    needle[0] = len & 0xff; needle[1] = (len >> 8) & 0xff; needle[2] = 0; needle[3] = 0;
    needle.set(k, 4); needle[needle.length - 1] = 0;
    const hits = findAll(bytes, needle);
    if (!hits.length) return null;
    return int32(bytes, hits[0] + needle.length);
  }
  function check(bytes) {
    const magic = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
    if (magic !== 'GVAS') return 'This is not an Unreal Engine save file.';
    if (!findAll(bytes, asciiBytes('SavableActorStates')).length)
      return 'This save has no world data. Pick World0.sav (not System0.sav or Challenges).';
    return null;
  }
  function analyze(bytes, items) {
    const err = check(bytes);
    if (err) return { error: err };
    const results = items.map(function (it) {
      const hits = findAll(bytes, hexToBytes(it.guid)).map(function (p) { return int32(bytes, p + 16); });
      const missing = hits.length === 0 || hits.indexOf(0) !== -1;
      return Object.assign({}, it, { missing: missing });
    });
    const counters = {
      eggsDelivered: namedInt(bytes, 'FishWifeTotalEggs'),
      skullsTurnedIn: namedInt(bytes, 'SkullsTurnedIn'),
      skullRewards: namedInt(bytes, 'SkullDoorRewardCount'),
      modulesGiven: namedInt(bytes, 'ScientistDataGiven'),
      skullsCarried: namedInt(bytes, '/Game/Items/KeyItems/SecretRelicKey/SkullKeyRelic_Data.SkullKeyRelic_Data'),
      eggsCarried: namedInt(bytes, '/Game/Items/KeyItems/Egg/FishWifeEgg.FishWifeEgg')
    };
    return { items: results, counters: counters };
  }
  const api = { analyze: analyze, namedInt: namedInt };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.QD = api;
})(this);
