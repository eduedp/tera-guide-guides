/* eslint-disable require-jsdoc */
// SoH v3
let lastSkill;
let hp30 = false;
let msg;

function inOutMech(handlers, event) {
    if (event.skill == 2201) msg = ' OUT';
    if (event.skill == 2206) msg = ' IN';

    if (lastSkill == 2201 && event.skill == 2202) msg = ' OUT -&gt; IN -&gt; OUT';
    if (lastSkill == 2206 && event.skill == 2202) msg = ' IN -&gt; OUT -&gt; OUT';
    if (lastSkill == 2206 && event.skill == 2207) msg = ' IN -&gt; OUT -&gt; IN';

    handlers['text']({
        'sub_type': 'notification',
        'message': msg,
    });

    lastSkill = event.skill;
}

function jumpHit(handlers, event) {
    if (hp30 == true) msg = ' Jump + Front Hit';
    else msg = ' Jump + Donut Hit';

    handlers['text']({
        'sub_type': 'notification',
        'message': msg,
    });
}

function changeHp100(handlers, event) {
    hp30 = false;
}

function changeHp30(handlers, event) {
    hp30 = true;
    handlers['text']({
        'sub_type': 'notification',
        'message': ' 30%',
    });
}

module.exports = {
    load(dispatch) {
        ({player, entity, library, effect} = dispatch.require.library);
    },

    // 100%
    'h-3020-2200-100': [{'type': 'func', 'func': changeHp100}],

    // Tough mobs
    's-3020-1900-1104-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' AoE DoT'}],
    's-3020-1900-2104-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' AoE DoT'}],
    's-3020-1200-1103-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' AoE DoT'}],
    's-3020-1200-2103-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' AoE DoT'}],

    // Breath/Strike
    'ae-0-0-30209101': [{'type': 'text', 'sub_type': 'notification', 'message': ' Out! Strike On You'}],
    'ae-0-0-30209102': [{'type': 'text', 'sub_type': 'notification', 'message': ' Out! Breath On You'}],

    // Final Boss
    // Rings
    's-3020-2200-1133-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Donuts! Dodge In'}],
    's-3020-2200-2133-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Donuts! Dodge In'}],
    // Stun
    's-3020-2200-1108-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Front Stun'}],
    's-3020-2200-2108-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Front Stun'}],
    // Jump Mech
    'dm-0-0-30209201': [{'type': 'text', 'sub_type': 'notification', 'message': ' Jump Waves'}],
    's-3020-2200-1135-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Jump Waves'}],
    's-3020-2200-2135-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Jump Waves'}],

    // Skull shot
    's-3020-2200-1129-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Skull Shot'}],
    's-3020-2200-2129-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Skull Shot'}],

    // Jump hit
    's-3020-2200-1127-0': [{'type': 'func', 'func': jumpHit}],
    's-3020-2200-2127-0': [{'type': 'func', 'func': jumpHit}],

    // InOut Mech
    'qb-3020-2200-302002201': [{'type': 'func', 'func': inOutMech, 'skill': 2201}],
    'qb-3020-2200-302002202': [{'type': 'func', 'func': inOutMech, 'skill': 2202}],
    'qb-3020-2200-302002206': [{'type': 'func', 'func': inOutMech, 'skill': 2206}],
    'qb-3020-2200-302002207': [{'type': 'func', 'func': inOutMech, 'skill': 2207}],

    // 30%
    's-3020-2200-1204-0': [{'type': 'func', 'func': changeHp30}],
    's-3020-2200-2204-0': [{'type': 'func', 'func': changeHp30}],

    // Wave in out
    's-3020-2200-1137-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Dodge Wave In'}],
    's-3020-2200-2137-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Dodge Wave In'}],
    's-3020-2200-1139-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Dodge Wave Out'}],
    's-3020-2200-2139-0': [{'type': 'text', 'sub_type': 'notification', 'message': ' Dodge Wave Out'}],

    /*
    in out out
    qb-3020-2200-302002206  get lost
    qb-3020-2200-302002202  kaboon

    in out in
    qb-3020-2200-302002206 get lost
    qb-3020-2200-302002207 how about a trip

    out in out
    qb-3020-2200-302002201 get over here
    qb-3020-2200-302002202 kaboon
    */
};
