/* tslint:disable:no-unused-variable */
import { DebugElement, Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, Observable } from 'rxjs/Rx';

import { HomeComponent } from '../../../../../../../main/webapp/app/features/meals/home/home.component';
import { HomeModule } from '../../../../../../../main/webapp/app/features/meals/home/home.module';
import { ApiService } from '../../../../../../../main/webapp/app/core/api/api.service';
import { MockApiService } from '../../../core/api/mock-api.service.spec';
import { GlobalEventsService } from '../../../../../../../main/webapp/app/core/global-events/global-events.service';
import { CoreModule } from '../../../../../../../main/webapp/app/core/core.module';
import { StatusBarService } from '../../../../../../../main/webapp/app/shared/status-bar/status-bar.service';
import { GreatBigExampleApplicationSharedModule } from '../../../../../../../main/webapp/app/shared/shared.module';
import { MockDocumentService } from '../../../../mocks/mock-document.service.spec';
import { MockWindowService } from '../../../../mocks/mock-window.service.spec';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    const mockApiService = new MockApiService();
    const mockDocumentService = new MockDocumentService();
    let mockWindowService: MockWindowService;
    const config: Route[] = [
        { path: '', component: HomeComponent },
        { path: 'test', component: HomeComponent, data: { layout: { paddingTop: true } } }
    ];
    beforeEach(async(() => {
        mockWindowService = new MockWindowService();
        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                HomeModule,
                GreatBigExampleApplicationSharedModule,
                RouterTestingModule.withRoutes(config)
            ],
            providers: [
                { provide: 'Document', useValue: mockDocumentService },
                GlobalEventsService,
                StatusBarService,
                { provide: 'Window', useValue: mockWindowService },
                { provide: ApiService, useValue: mockApiService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get filterOptions from an Observable', () => {
        mockApiService.update();
        const searchFields = component.filteredMeta.searchFields;
        expect(searchFields.length === 0).toBe(true);
    });

    it('should use filter.prefilter to filter an array', () => {
        const filtered = [34, 65, 23, 78].filter(component.filteredMeta.prefilter);
        expect(filtered).toEqual([65, 23, 78]);
    });

    it('should scroll', done => {
        component.onFilterUpdate(123);
        setTimeout(() => {
            const newP = mockWindowService.pageYOffset;
            expect(newP).toBe(223);
            done();
        });
    });

    it('should increase the limit', () => {
        component.limit = 7;
        component.onScroll();
        expect(component.limit).toBe(13);
    });
});
