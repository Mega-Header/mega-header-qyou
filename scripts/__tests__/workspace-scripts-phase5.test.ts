import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getPhase5Contract, PHASE5_CONTRACTS, validatePhase5Contract } from '../workspace-scripts-contract-phase5.js';

describe('getPhase5Contract', () => {
  it('returns contract for @mega-header-qyou/api', () => {
    const c = getPhase5Contract('@mega-header-qyou/api');
    assert.ok(c);
    assert.equal(c?.workspace, '@mega-header-qyou/api');
  });

  it('returns contract for @mega-header-qyou/web', () => {
    const c = getPhase5Contract('@mega-header-qyou/web');
    assert.ok(c);
  });

  it('returns undefined for unknown workspace', () => {
    assert.equal(getPhase5Contract('@mega-header-qyou/unknown'), undefined);
  });
});

describe('PHASE5_CONTRACTS', () => {
  it('has all five workspace contracts', () => {
    const workspaces = ['@mega-header-qyou/api', '@mega-header-qyou/web', '@mega-header-qyou/mobile', '@mega-header-qyou/shared', '@mega-header-qyou/stellar'];
    for (const ws of workspaces) {
      assert.ok(PHASE5_CONTRACTS.some((c) => c.workspace === ws), `Missing contract for ${ws}`);
    }
  });

  it('all contracts have buildOrder >= 1', () => {
    for (const c of PHASE5_CONTRACTS) {
      assert.ok(c.buildOrder >= 1, `${c.workspace} buildOrder must be >= 1`);
    }
  });

  it('build order respects dependencies', () => {
    const ordered = [...PHASE5_CONTRACTS].sort((a, b) => a.buildOrder - b.buildOrder);
    for (let i = 0; i < ordered.length; i++) {
      for (const s of ordered[i].scripts) {
        for (const dep of s.dependsOn) {
          const depContract = ordered.find((c) => c.workspace === dep);
          if (depContract) {
            assert.ok(depContract.buildOrder < ordered[i].buildOrder,
              `${ordered[i].workspace} depends on ${dep} but builds before it`);
          }
        }
      }
    }
  });

  it('shared package does not depend on app packages', () => {
    const shared = PHASE5_CONTRACTS.find((c) => c.workspace === '@mega-header-qyou/shared')!;
    for (const s of shared.scripts) {
      for (const dep of s.dependsOn) {
        assert.ok(!dep.startsWith('@mega-header-qyou/api') && !dep.startsWith('@mega-header-qyou/web') && !dep.startsWith('@mega-header-qyou/mobile'),
          `@mega-header-qyou/shared should not depend on app packages`);
      }
    }
  });

  it('all contracts define boundary rules', () => {
    for (const c of PHASE5_CONTRACTS) {
      assert.ok(Array.isArray(c.boundary.allowedImports));
      assert.ok(Array.isArray(c.boundary.forbiddenImports));
    }
  });
});

describe('validatePhase5Contract', () => {
  it('passes for valid contract', () => {
    const api = getPhase5Contract('@mega-header-qyou/api')!;
    assert.equal(validatePhase5Contract(api).length, 0);
  });

  it('fails if buildOrder < 1', () => {
    const c = getPhase5Contract('@mega-header-qyou/api')!;
    const broken = { ...c, buildOrder: 0 };
    const errors = validatePhase5Contract(broken);
    assert.ok(errors.some((e) => e.includes('buildOrder')));
  });

  it('fails for shared if no forbidden imports', () => {
    const c = getPhase5Contract('@mega-header-qyou/shared')!;
    const broken = { ...c, boundary: { ...c.boundary, forbiddenImports: [] } };
    const errors = validatePhase5Contract(broken);
    assert.equal(errors.length, 0);
  });
});
